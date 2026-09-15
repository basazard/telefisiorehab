import { createFileRoute, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { Activity } from "lucide-react";
import { useEffect } from "react";
import { OnboardingProvider, useOnboarding } from "@/components/OnboardingProvider";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingLayout,
});

const STEPS = [
  { path: "/onboarding", label: "Profile", time: "~3 min" },
  { path: "/onboarding/screening", label: "Screening", time: "~2 min" },
  { path: "/onboarding/red-flags", label: "Safety check", time: "~2 min" },
  { path: "/onboarding/assessment", label: "Assessment", time: "~5–8 min" },
  { path: "/onboarding/results", label: "Results", time: "~1 min" },
];

function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Shell />
    </OnboardingProvider>
  );
}

function Shell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { state, hydrated } = useOnboarding();

  const index = Math.max(
    0,
    STEPS.map((s) => s.path).lastIndexOf(pathname.replace(/\/$/, "") || "/onboarding"),
  );
  const step = STEPS[index] ?? STEPS[0];

  const blocked = state.redFlags.flagged.length > 0;
  const gatedPath = pathname.startsWith("/onboarding/assessment") || pathname.startsWith("/onboarding/results");

  useEffect(() => {
    if (!hydrated) return;
    if (blocked && gatedPath) {
      navigate({ to: "/onboarding/red-flags", replace: true });
      return;
    }
    if (!blocked && !state.redFlags.cleared && gatedPath) {
      navigate({ to: "/onboarding/red-flags", replace: true });
    }
  }, [hydrated, blocked, gatedPath, state.redFlags.cleared, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-4">
          <div className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
            <Activity className="size-5" />
          </div>
          <span className="font-display text-base font-bold">TeleFisioRehab</span>
          <span className="ml-auto text-xs text-muted-foreground">
            Step {index + 1} of {STEPS.length} • {step.label} • {step.time}
          </span>
        </div>
        <div className="mx-auto max-w-3xl px-5 pb-4">
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s.path}
                className={`h-1.5 flex-1 rounded-full ${i <= index ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-8 pb-20">
        {hydrated ? (
          <Outlet />
        ) : (
          <p className="text-sm text-muted-foreground">Loading your progress…</p>
        )}
      </main>
    </div>
  );
}
