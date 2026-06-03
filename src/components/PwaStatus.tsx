import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/** Tracks navigator.onLine and updates on connectivity changes. */
function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return online;
}

/** Captures the install prompt so we can offer an "Install app" button. */
function useInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return { canInstall: !!deferred && !installed, promptInstall };
}

export function PwaStatus() {
  const online = useOnlineStatus();
  const { canInstall, promptInstall } = useInstallPrompt();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const closeToast = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <>
      {!online && (
        <div className="pwa-offline-badge" role="status">
          ✈️ Offline — gespeicherte Karten &amp; Daten
        </div>
      )}

      {canInstall && (
        <button className="pwa-install-btn" onClick={promptInstall}>
          📲 App installieren
        </button>
      )}

      {(offlineReady || needRefresh) && (
        <div className="pwa-toast" role="alert">
          <span className="pwa-toast-text">
            {needRefresh
              ? 'Neue Version verfügbar.'
              : 'App ist offline einsatzbereit. ✓'}
          </span>
          <div className="pwa-toast-actions">
            {needRefresh && (
              <button onClick={() => updateServiceWorker(true)}>Aktualisieren</button>
            )}
            <button className="pwa-toast-close" onClick={closeToast}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}
