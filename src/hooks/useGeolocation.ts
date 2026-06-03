import { useCallback, useEffect, useRef, useState } from 'react';

export interface GeoPosition {
  lat: number;
  lng: number;
  /** Accuracy radius in metres. */
  accuracy: number;
  /** Heading in degrees (0 = north), or null if unavailable. */
  heading: number | null;
  /** Ground speed in m/s, or null if unavailable. */
  speed: number | null;
  timestamp: number;
}

export interface GeolocationState {
  position: GeoPosition | null;
  tracking: boolean;
  error: string | null;
  supported: boolean;
  toggle: () => void;
  stop: () => void;
}

/**
 * Shared GPS tracking. One watchPosition lifted to app level so the map,
 * the nav panel and the elevation chart all read the same live position.
 */
export function useGeolocation(): GeolocationState {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchRef = useRef<number | null>(null);

  const supported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  const stop = useCallback(() => {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    setTracking(false);
  }, []);

  const start = useCallback(() => {
    if (!supported) {
      setError('GPS wird von diesem Gerät nicht unterstützt.');
      return;
    }
    setError(null);
    setTracking(true);
    watchRef.current = navigator.geolocation.watchPosition(
      (p) => {
        setPosition({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracy: p.coords.accuracy,
          heading: Number.isFinite(p.coords.heading) ? p.coords.heading : null,
          speed: Number.isFinite(p.coords.speed) ? p.coords.speed : null,
          timestamp: p.timestamp,
        });
      },
      (err) => {
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Standort-Berechtigung verweigert.'
            : 'GPS-Signal nicht verfügbar.',
        );
        setTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 20000 },
    );
  }, [supported]);

  const toggle = useCallback(() => {
    if (tracking) {
      stop();
      setPosition(null);
    } else {
      start();
    }
  }, [tracking, start, stop]);

  // Clean up the watch on unmount.
  useEffect(() => {
    return () => {
      if (watchRef.current !== null) {
        navigator.geolocation.clearWatch(watchRef.current);
      }
    };
  }, []);

  return { position, tracking, error, supported, toggle, stop };
}
