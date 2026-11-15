import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type StatusToastContextValue = { show: (message: string) => void };

const StatusToastContext = createContext<StatusToastContextValue | null>(null);

export function useStatusToast() {
  const ctx = useContext(StatusToastContext);
  if (!ctx) throw new Error("useStatusToast must be used inside StatusToastProvider");
  return ctx;
}

export function StatusToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timeout = useRef<number | undefined>(undefined);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setMessage(null), 5000);
  }, []);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  return (
    <StatusToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div
          className="fixed bottom-6 left-6 z-50 max-w-sm panel border-cyan/60 p-4 shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="technical text-[10px] font-bold text-cyan block mb-0.5">RESOURCE PLACEHOLDER</span>
              <p className="text-xs text-foreground leading-snug">{message}</p>
            </div>
            <button
              type="button"
              onClick={() => setMessage(null)}
              className="text-muted-foreground hover:text-foreground text-sm font-bold px-1"
              aria-label="Close message"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </StatusToastContext.Provider>
  );
}
