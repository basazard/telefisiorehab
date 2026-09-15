import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useOnboarding } from "@/components/OnboardingProvider";
import { Chip, Field, GhostButton, PrimaryButton, inputClass } from "@/components/onboarding-ui";
import {
  ACTIVITY_LEVELS,
  CONDITIONS,
  GOALS,
  OCCUPATIONS,
  ageTrack,
  calcAge,
  calcBmi,
  trackLabel,
  type ActivityLevel,
  type Gender,
} from "@/lib/onboarding";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "Profile Setup — TeleFisioRehab Onboarding" },
      {
        name: "description",
        content:
          "Set up your rehabilitation profile: identity, body data, lifestyle and recovery goals.",
      },
      { property: "og:title", content: "Profile Setup — TeleFisioRehab Onboarding" },
      {
        property: "og:description",
        content: "Four quick steps to personalise your home physiotherapy program.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileWizard,
});

const SUB_STEPS = ["Identity", "Body data", "Lifestyle", "Goals"];

function ProfileWizard() {
  const { state, update } = useOnboarding();
  const navigate = useNavigate();
  const [sub, setSub] = useState(0);
  const p = state.profile;

  const setProfile = (patch: Partial<typeof p>) =>
    update((s) => ({ ...s, profile: { ...s.profile, ...patch } }));

  const age = calcAge(p.dob);
  const track = ageTrack(age);
  const bmi = calcBmi(p.heightCm, p.weightKg);

  const toggle = (key: "conditions" | "goals", value: string, max?: number) => {
    const list = p[key];
    if (list.includes(value)) {
      setProfile({ [key]: list.filter((v) => v !== value) } as Partial<typeof p>);
      return;
    }
    if (key === "conditions" && value === "None") {
      setProfile({ conditions: ["None"] });
      return;
    }
    const base = key === "conditions" ? list.filter((v) => v !== "None") : list;
    if (max && base.length >= max) return;
    setProfile({ [key]: [...base, value] } as Partial<typeof p>);
  };

  const canContinue =
    sub === 0
      ? p.name.trim().length > 1 && !!age && !!p.gender
      : sub === 1
        ? !!bmi
        : sub === 2
          ? !!p.occupation && !!p.activity
          : p.goals.length > 0 || p.goalOther.trim().length > 0;

  const next = () => (sub < 3 ? setSub(sub + 1) : navigate({ to: "/onboarding/screening" }));

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Profile setup</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Step {sub + 1} of 4 • {SUB_STEPS[sub]}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
        {sub === 0 && (
          <div className="grid gap-5">
            <Field label="Full name">
              <input
                className={inputClass}
                value={p.name}
                onChange={(e) => setProfile({ name: e.target.value })}
                placeholder="e.g. Amelia Chen"
              />
            </Field>
            <Field label="Date of birth">
              <input
                type="date"
                className={inputClass}
                value={p.dob}
                onChange={(e) => setProfile({ dob: e.target.value })}
              />
            </Field>
            {age !== null && (
              <p className="text-sm text-muted-foreground">
                Age: <span className="font-semibold text-foreground">{age} years</span>
              </p>
            )}
            {track && (
              <div className="rounded-xl border border-primary/30 bg-secondary px-4 py-3 text-sm text-secondary-foreground">
                {trackLabel[track].emoji} {trackLabel[track].text}
              </div>
            )}
            <Field label="Gender">
              <div className="flex flex-wrap gap-2">
                {(["female", "male", "other"] as Gender[]).map((g) => (
                  <Chip key={g} active={p.gender === g} onClick={() => setProfile({ gender: g })}>
                    <span className="capitalize">{g}</span>
                  </Chip>
                ))}
              </div>
            </Field>
          </div>
        )}

        {sub === 1 && (
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Height (cm)">
                <input
                  type="number"
                  className={inputClass}
                  value={p.heightCm}
                  onChange={(e) =>
                    setProfile({ heightCm: e.target.value === "" ? "" : Number(e.target.value) })
                  }
                  placeholder="168"
                />
              </Field>
              <Field label="Weight (kg)">
                <input
                  type="number"
                  className={inputClass}
                  value={p.weightKg}
                  onChange={(e) =>
                    setProfile({ weightKg: e.target.value === "" ? "" : Number(e.target.value) })
                  }
                  placeholder="62"
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-border bg-[image:var(--gradient-soft)] p-6 text-center">
              <p className="text-xs text-muted-foreground">Body Mass Index</p>
              <p className="mt-1 font-display text-4xl font-extrabold transition-all">
                {bmi ? bmi.value : "—"}
              </p>
              <p
                className={`mt-1 text-sm font-medium ${
                  bmi?.tone === "success"
                    ? "text-success"
                    : bmi?.tone === "warning"
                      ? "text-warning"
                      : bmi
                        ? "text-destructive"
                        : "text-muted-foreground"
                }`}
              >
                {bmi ? bmi.category : "Enter height and weight"}
              </p>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-hero)] transition-all duration-500"
                  style={{ width: `${Math.min(100, ((bmi?.value ?? 0) / 40) * 100)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>
        )}

        {sub === 2 && (
          <div className="grid gap-6">
            <Field label="Occupation">
              <select
                className={inputClass}
                value={p.occupation}
                onChange={(e) => setProfile({ occupation: e.target.value })}
              >
                <option value="">Select occupation</option>
                {OCCUPATIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Daily activity level">
              <div className="flex flex-wrap gap-2">
                {ACTIVITY_LEVELS.map((a) => (
                  <Chip
                    key={a.id}
                    active={p.activity === a.id}
                    onClick={() => setProfile({ activity: a.id as ActivityLevel })}
                  >
                    {a.label}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Special conditions">
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => (
                  <Chip
                    key={c}
                    active={p.conditions.includes(c)}
                    onClick={() => toggle("conditions", c)}
                  >
                    {c}
                  </Chip>
                ))}
              </div>
            </Field>
          </div>
        )}

        {sub === 3 && (
          <div className="grid gap-5">
            <Field label="Pick up to 3 recovery goals">
              <div className="flex flex-wrap gap-2">
                {GOALS.map((g) => (
                  <Chip
                    key={g}
                    active={p.goals.includes(g)}
                    disabled={!p.goals.includes(g) && p.goals.length >= 3}
                    onClick={() => toggle("goals", g, 3)}
                  >
                    {g}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label="Anything else you want to achieve? (optional)">
              <textarea
                className={`${inputClass} min-h-24`}
                value={p.goalOther}
                onChange={(e) => setProfile({ goalOther: e.target.value })}
                placeholder="e.g. Walk my dog again without knee pain"
              />
            </Field>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <GhostButton onClick={() => setSub(Math.max(0, sub - 1))} disabled={sub === 0}>
          <ArrowLeft className="size-4" /> Back
        </GhostButton>
        <PrimaryButton onClick={next} disabled={!canContinue}>
          {sub < 3 ? "Continue" : "Start screening"} <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
