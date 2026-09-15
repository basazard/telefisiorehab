import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useOnboarding } from "@/components/OnboardingProvider";
import { PrimaryButton } from "@/components/onboarding-ui";
import { TIER_INFO, nrsLabel, pickDomain, scoreAssessment } from "@/lib/onboarding";

export const Route = createFileRoute("/onboarding/results")({
  head: () => ({
    meta: [
      { title: "Assessment Results — TeleFisioRehab" },
      {
        name: "description",
        content: "Your risk tier, functional score and the rehabilitation program assigned to you.",
      },
      { property: "og:title", content: "Assessment Results — TeleFisioRehab" },
      {
        property: "og:description",
        content: "Risk score and personalised home physiotherapy program assignment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { state, update } = useOnboarding();
  const navigate = useNavigate();
  const score = scoreAssessment(state);
  const info = TIER_INFO[score.tier];
  const domain = pickDomain(state);

  const start = () => {
    update((s) => ({ ...s, completedAt: new Date().toISOString() }));
    navigate({ to: "/patient" });
  };

  return (
    <div className="grid gap-6">
      <h1 className="font-display text-2xl font-bold md:text-3xl">Your assessment results</h1>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <p className="font-display text-xl font-extrabold">
          {info.emoji} {info.label}
        </p>
        <div className="mt-4 grid gap-2 text-sm">
          <p>
            LEFS score: <span className="font-semibold">{score.lefs}/80</span>
          </p>
          {score.odiPercent !== null && (
            <p>
              Oswestry Disability Index:{" "}
              <span className="font-semibold">{score.odiPercent}% disability</span>
            </p>
          )}
          <p>
            Pain level:{" "}
            <span className="font-semibold">
              {score.pain}/10 — {nrsLabel(score.pain)}
            </span>
          </p>
          <p>
            Range of motion: <span className="font-semibold">{score.rom}% of normal</span>
          </p>
          <p>
            Assessment domain: <span className="font-semibold">{domain}</span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        <h2 className="font-display font-bold">What this means</h2>
        <p className="mt-2 text-sm text-muted-foreground">{info.meaning}</p>

        <h2 className="mt-6 font-display font-bold">Your program includes</h2>
        <ul className="mt-3 grid gap-2 text-sm">
          {info.program.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-success/20 text-success">
                <Check className="size-3.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <PrimaryButton onClick={start}>
        Start your program <ArrowRight className="size-4" />
      </PrimaryButton>
    </div>
  );
}
