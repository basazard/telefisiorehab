import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";
import { useOnboarding } from "@/components/OnboardingProvider";
import { GhostButton, PrimaryButton } from "@/components/onboarding-ui";
import {
  LEFS_CHOICES,
  LEFS_ITEMS,
  ODI_CHOICES,
  ODI_ITEMS,
  maxPain,
  needsOdi,
  nrsLabel,
  pickDomain,
} from "@/lib/onboarding";

export const Route = createFileRoute("/onboarding/assessment")({
  head: () => ({
    meta: [
      { title: "Clinical Assessment — TeleFisioRehab" },
      {
        name: "description",
        content:
          "Domain-routed clinical assessment with validated instruments such as LEFS and ODI.",
      },
      { property: "og:title", content: "Clinical Assessment — TeleFisioRehab" },
      {
        property: "og:description",
        content: "Step-by-step questionnaires that score your functional ability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentPage,
});

type Question =
  | { kind: "intro" }
  | { kind: "pain" }
  | { kind: "rom" }
  | { kind: "choice"; id: string; instrument: string; title: string; choices: { v: number; label: string }[] };

function AssessmentPage() {
  const { state, update } = useOnboarding();
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const domain = pickDomain(state);
  const pain = maxPain(state);

  const questions = useMemo<Question[]>(() => {
    const list: Question[] = [{ kind: "intro" }, { kind: "pain" }, { kind: "rom" }];
    LEFS_ITEMS.forEach((title, idx) =>
      list.push({
        kind: "choice",
        id: `lefs-${idx}`,
        instrument: "LEFS",
        title: `How much difficulty do you have with: ${title}?`,
        choices: LEFS_CHOICES,
      }),
    );
    if (needsOdi(state)) {
      ODI_ITEMS.forEach((title, idx) =>
        list.push({
          kind: "choice",
          id: `odi-${idx}`,
          instrument: "ODI",
          title: `${title} — how limited are you by your back pain?`,
          choices: ODI_CHOICES,
        }),
      );
    }
    return list;
  }, [state]);

  const q = questions[i]!;
  const remaining = Math.max(1, Math.round(((questions.length - i) * 15) / 60));

  const setAnswer = (id: string, v: number) =>
    update((s) => ({
      ...s,
      assessment: { ...s.assessment, answers: { ...s.assessment.answers, [id]: v } },
    }));

  const goNext = () => {
    if (i + 1 < questions.length) {
      setI(i + 1);
      return;
    }
    update((s) => ({ ...s, assessment: { ...s.assessment, completed: true } }));
    navigate({ to: "/onboarding/results" });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {q.kind === "choice" ? `${q.instrument} • ` : ""}Question {i + 1} of {questions.length}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" /> ~{remaining} min left • answers saved automatically
        </span>
      </div>

      {q.kind === "intro" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            <Stethoscope className="size-3.5" /> Domain router
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">
            Based on your symptoms, we'll use a {domain} assessment.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This takes about 5–8 minutes. Your answers save as you go, so you can stop and come
            back.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li>• Areas reported: {state.screening.regions.join(", ") || "—"}</li>
            <li>• Instruments: NRS, Range of Motion{needsOdi(state) ? ", LEFS, ODI" : ", LEFS"}</li>
          </ul>
        </div>
      )}

      {q.kind === "pain" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h1 className="font-display text-xl font-bold">Your reported pain</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Captured during screening. You can change it on the previous step.
          </p>
          <p className="mt-6 font-display text-5xl font-extrabold">{pain}/10</p>
          <p className="mt-1 text-sm font-medium text-primary">{nrsLabel(pain)}</p>
        </div>
      )}

      {q.kind === "rom" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h1 className="font-display text-xl font-bold">
            How far can you move the affected area, compared to normal?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Move the slider to the angle that feels achievable without sharp pain.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={state.assessment.answers["rom"] ?? 50}
            onChange={(e) => setAnswer("rom", Number(e.target.value))}
            aria-valuetext={`Range of motion: ${state.assessment.answers["rom"] ?? 50} percent of normal`}
            className="mt-6 w-full accent-[var(--color-primary)]"
          />
          <p className="mt-3 font-display text-3xl font-bold">
            {state.assessment.answers["rom"] ?? 50}% of normal range
          </p>
        </div>
      )}

      {q.kind === "choice" && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <h1 className="font-display text-xl font-bold leading-snug">{q.title}</h1>
          <div className="mt-5 grid gap-2">
            {q.choices.map((c) => {
              const active = state.assessment.answers[q.id] === c.v;
              return (
                <button
                  key={c.v}
                  type="button"
                  onClick={() => setAnswer(q.id, c.v)}
                  aria-pressed={active}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                    active
                      ? "border-primary bg-secondary"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <span
                    className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${
                      active ? "border-primary" : "border-border"
                    }`}
                  >
                    {active && <span className="size-2.5 rounded-full bg-primary" />}
                  </span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <GhostButton
          onClick={() => (i === 0 ? navigate({ to: "/onboarding/red-flags" }) : setI(i - 1))}
        >
          <ArrowLeft className="size-4" /> Back
        </GhostButton>
        <PrimaryButton
          onClick={goNext}
          disabled={q.kind === "choice" && state.assessment.answers[q.id] === undefined}
        >
          {i + 1 < questions.length ? "Next" : "See my results"} <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
