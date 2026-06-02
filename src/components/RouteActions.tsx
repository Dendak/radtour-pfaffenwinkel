import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import type { ParsedRoute } from '../data/types';

interface Props {
  route: ParsedRoute;
}

export function RouteActions({ route }: Props) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [shareMsg, setShareMsg] = useState<string | null>(null);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const gpxHref = `${import.meta.env.BASE_URL}gpx/${route.config.gpxFile}`;

  useEffect(() => {
    if (!showQr || qrUrl || !pageUrl) return;
    QRCode.toDataURL(pageUrl, { width: 220, margin: 1 })
      .then(setQrUrl)
      .catch(() => setShareMsg('QR-Code konnte nicht erzeugt werden.'));
  }, [showQr, qrUrl, pageUrl]);

  const handleShare = async () => {
    const shareData = {
      title: 'Radtour Pfaffenwinkel 2026',
      text: `${route.config.title} — ${route.totalDistance} km, ${route.elevationGain} hm`,
      url: pageUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl);
        setShareMsg('Link kopiert ✓');
        setTimeout(() => setShareMsg(null), 2500);
      }
    } catch {
      /* user cancelled the share sheet */
    }
  };

  return (
    <div className="route-actions">
      <div className="route-actions-row">
        <a className="action-btn" href={gpxHref} download={route.config.gpxFile}>
          ⬇️ GPX
        </a>
        <button className="action-btn" onClick={handleShare}>
          🔗 Teilen
        </button>
        <button
          className={`action-btn ${showQr ? 'active' : ''}`}
          onClick={() => setShowQr((v) => !v)}
        >
          🔳 QR
        </button>
        <button className="action-btn" onClick={() => window.print()}>
          🖨️ Roadbook
        </button>
      </div>

      {shareMsg && <p className="action-msg">{shareMsg}</p>}

      {showQr && qrUrl && (
        <div className="qr-box">
          <img src={qrUrl} alt="QR-Code zur App" width={180} height={180} />
          <span>Scannen, um die App auf einem anderen Gerät zu öffnen</span>
        </div>
      )}
    </div>
  );
}
