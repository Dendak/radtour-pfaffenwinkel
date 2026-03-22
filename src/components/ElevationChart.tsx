import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrackPoint } from '../data/types';
import { downsample } from '../utils/gpxParser';

interface Props {
  points: TrackPoint[];
  color: string;
  onHover: (point: TrackPoint | null) => void;
}

export function ElevationChart({ points, color, onHover }: Props) {
  const chartData = downsample(points, 500);

  const handleMouseMove = (e: { activePayload?: Array<{ payload: TrackPoint }> }) => {
    if (e.activePayload?.[0]) {
      onHover(e.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  const minEle = Math.floor(Math.min(...chartData.map((p) => p.ele)) / 10) * 10 - 10;
  const maxEle = Math.ceil(Math.max(...chartData.map((p) => p.ele)) / 10) * 10 + 10;

  return (
    <div className="elevation-chart">
      <h3>Höhenprofil</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={chartData}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="dist"
            tickFormatter={(v: number) => `${Math.round(v)} km`}
            tick={{ fontSize: 11 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[minEle, maxEle]}
            tickFormatter={(v: number) => `${v} m`}
            tick={{ fontSize: 11 }}
            width={55}
          />
          <Tooltip
            formatter={(value: number) => [`${Math.round(value)} m`, 'Höhe']}
            labelFormatter={(label: number) => `${label.toFixed(1)} km`}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Area
            type="monotone"
            dataKey="ele"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
