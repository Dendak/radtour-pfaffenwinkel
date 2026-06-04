import { useMemo, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import type { TrackPoint } from '../data/types';
import { downsample } from '../utils/gpxParser';

interface Props {
  points: TrackPoint[];
  color: string;
  onHover: (point: TrackPoint | null) => void;
  /** Live position along the route (km) — draws a "you are here" marker. */
  currentDist?: number | null;
}

// Chart geometry — kept in sync with the YAxis width and chart margins below.
const PLOT_LEFT = 55; // YAxis width + left margin
const PLOT_RIGHT_INSET = 10; // right margin

/** Add a smoothed gradient (percent) to each point via central difference. */
function withSlope(data: TrackPoint[]): TrackPoint[] {
  return data.map((p, i) => {
    const a = data[Math.max(0, i - 1)];
    const b = data[Math.min(data.length - 1, i + 1)];
    const dEleM = b.ele - a.ele;
    const dDistM = (b.dist - a.dist) * 1000;
    return { ...p, slope: dDistM > 0 ? (dEleM / dDistM) * 100 : 0 };
  });
}

/** Tooltip showing distance, elevation and gradient at the hovered point. */
function ElevTooltip(props: { active?: boolean; payload?: Array<{ payload: TrackPoint }> }) {
  if (!props.active || !props.payload?.length) return null;
  const p = props.payload[0].payload;
  const slope = p.slope ?? 0;
  const arrow = slope > 0.5 ? '↗' : slope < -0.5 ? '↘' : '→';
  const cls = slope > 0.5 ? 'up' : slope < -0.5 ? 'down' : 'flat';
  return (
    <div className="elev-tooltip">
      <span>{p.dist.toFixed(1)} km</span>
      <span>{Math.round(p.ele)} m</span>
      <span className={`elev-tooltip-slope ${cls}`}>
        {arrow} {Math.abs(slope).toFixed(1)} %
      </span>
    </div>
  );
}

export function ElevationChart({ points, color, onHover, currentDist }: Props) {
  const chartData = useMemo(() => withSlope(downsample(points, 500)), [points]);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Drive the map marker from raw pointer X (works for mouse, touch and pen).
  // recharts v3 does not populate its tooltip index on touch, so we map the
  // horizontal position to a distance ourselves and pick the nearest point.
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el || chartData.length === 0) return;
    const rect = el.getBoundingClientRect();
    const left = rect.left + PLOT_LEFT;
    const right = rect.right - PLOT_RIGHT_INSET;
    if (right <= left) return;

    const frac = Math.max(0, Math.min(1, (e.clientX - left) / (right - left)));
    const targetDist = frac * chartData[chartData.length - 1].dist;

    let best = chartData[0];
    let bestDelta = Infinity;
    for (const p of chartData) {
      const delta = Math.abs(p.dist - targetDist);
      if (delta < bestDelta) {
        bestDelta = delta;
        best = p;
      }
    }
    onHover(best);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    // Keep the marker after a touch scrub; clear it when the mouse leaves.
    if (e.pointerType !== 'touch') onHover(null);
  };

  const minEle = Math.floor(Math.min(...chartData.map((p) => p.ele)) / 10) * 10 - 10;
  const maxEle = Math.ceil(Math.max(...chartData.map((p) => p.ele)) / 10) * 10 + 10;

  return (
    <div className="elevation-chart">
      <h3>
        Höhenprofil
        <span className="elevation-hint">Fahre/tippe entlang des Profils → Position auf der Karte</span>
      </h3>
      <div
        className="elevation-chart-plot"
        ref={wrapRef}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        onPointerLeave={handlePointerLeave}
      >
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: PLOT_RIGHT_INSET, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dist"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(v) => `${Math.round(Number(v))} km`}
              tick={{ fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[minEle, maxEle]}
              tickFormatter={(v) => `${v} m`}
              tick={{ fontSize: 11 }}
              width={55}
            />
            <Tooltip
              cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
              content={(props) => (
                <ElevTooltip
                  active={props.active}
                  payload={props.payload as unknown as Array<{ payload: TrackPoint }>}
                />
              )}
            />
            <Area
              type="monotone"
              dataKey="ele"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${color.replace('#', '')})`}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
            />
            {currentDist != null && (
              <ReferenceLine
                x={currentDist}
                stroke="#3b82f6"
                strokeWidth={2}
                label={{ value: '📍 hier', position: 'top', fontSize: 11, fill: '#3b82f6' }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
