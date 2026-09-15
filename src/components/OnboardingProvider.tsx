import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { emptyState, STORAGE_KEY, type OnboardingState } from "@/lib/onboarding";

type Ctx = {
  state: OnboardingState;
  hydrated: boolean;
  update: (fn: (draft: OnboardingState) => OnboardingState) => void;
  reset: () => void;
};

const OnboardingContext = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as OnboardingState;
        setState({
          ...emptyState,
          ...parsed,
          profile: { ...emptyState.profile, ...parsed.profile },
          screening: { ...emptyState.screening, ...parsed.screening },
          redFlags: { ...emptyState.redFlags, ...parsed.redFlags },
          assessment: { ...emptyState.assessment, ...parsed.assessment },
        });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  const update = useCallback((fn: (draft: OnboardingState) => OnboardingState) => {
    setState((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setState(emptyState);
  }, []);

  const value = useMemo(() => ({ state, hydrated, update, reset }), [state, hydrated, update, reset]);

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used inside OnboardingProvider");
  return ctx;
}
