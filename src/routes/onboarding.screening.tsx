import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useOnboarding } from "@/components/OnboardingProvider";
import { BodyMap } from "@/components/BodyMap";
import { Chip, Field, GhostButton, PrimaryButton, inputClass } from "@/components/onboarding-ui";
import { AGGRAVATORS, PAIN_CHARACTERS, nrsLabel, type Complaint } from "@/lib/onboarding";

export const Route = createFileRoute("/onboarding/screening")({
  head: () => ({
    meta: [
      { title: "Body Map Screening — TeleFisioRehab" },
      {
        name: "description",
        content: "Mark the areas that hurt on an interactive body map and describe each complaint.",
      },
      { property: "og:title", content: "Body Map Screening — TeleFisioRehab" },
      {
        property: "og:description",
        content: "Select painful body regions and record onset, character and pain severity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScreeningPage,
});

const emptyComplaint: Complaint = {
  onset: "",
  onsetUnknown: false,
  onsetType: "",
  characters: [],
  aggravators: [],
  nrs: 0,
};

function ScreeningPage() {
  const { state, update } = useOnboarding();
  const navigate = useNavigate();
  const { regions, complaints } = state.screening;

  const toggleRegion = (id: string) =>
    update((s) => {
      const has = s.screening.regions.includes(id);
      const nextRegions = has
        ? s.screening.regions.filter((r) => r !== id)
        : [...s.screening.regions, id];
      const nextComplaints = { ...s.screening.complaints };
      if (has) delete nextComplaints[id];
      else nextComplaints[id] = { ...emptyComplaint };
      return { ...s, screening: { regions: nextRegions, complaints: nextComplaints } };
    });

  const setComplaint = (id: string, patch: Partial<Complaint>) =>
    update((s) => ({
      ...s,
      screening: {
        ...s.screening,
        complaints: {
          ...s.screening.complaints,
          [id]: { ...emptyComplaint, ...s.screening.complaints[id], ...patch },
        },
      },
    }));

  const toggleIn = (id: string, key: "characters" | "aggravators", value: string) => {
    const current = complaints[id]?.[key] ?? [];
    setComplaint(id, {
      [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    } as Partial<Complaint>);
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Where does it hurt?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tap every area that bothers you. You can select more than one.
        </p>
      </div>

      <BodyMap selected={regions} onToggle={toggleRegion} />

      <div>
        <p className="text-sm font-medium">Selected areas</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {regions.length === 0 && (
            <p className="text-sm text-muted-foreground">No areas selected yet.</p>
          )}
          {regions.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
            >
              {r}
              <button
                type="button"
                aria-label={`Remove ${r}`}
                onClick={() => toggleRegion(r)}
                className="rounded-full p-0.5 hover:bg-card"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {regions.map((r) => {
        const c = complaints[r] ?? emptyComplaint;
        return (
          <div
            key={r}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
          >
            <h2 className="font-display text-lg font-bold">{r}</h2>

            <div className="mt-5 grid gap-5">
              <Field label="When did this start?">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="date"
                    className={`${inputClass} max-w-52`}
                    value={c.onset}
                    disabled={c.onsetUnknown}
                    onChange={(e) => setComplaint(r, { onset: e.target.value })}
                  />
                  <Chip
                    active={c.onsetUnknown}
                    onClick={() => setComplaint(r, { onsetUnknown: !c.onsetUnknown, onset: "" })}
                  >
                    I don't remember
                  </Chip>
                </div>
              </Field>

              <Field label="How did it start?">
                <div className="flex gap-2">
                  {(["sudden", "gradual"] as const).map((t) => (
                    <Chip
                      key={t}
                      active={c.onsetType === t}
                      onClick={() => setComplaint(r, { onsetType: t })}
                    >
                      <span className="capitalize">{t}</span>
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="What does it feel like?">
                <div className="flex flex-wrap gap-2">
                  {PAIN_CHARACTERS.map((ch) => (
                    <Chip
                      key={ch}
                      active={c.characters.includes(ch)}
                      onClick={() => toggleIn(r, "characters", ch)}
                    >
                      {ch}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="What makes it worse?">
                <div className="flex flex-wrap gap-2">
                  {AGGRAVATORS.map((a) => (
                    <Chip
                      key={a}
                      active={c.aggravators.includes(a)}
                      onClick={() => toggleIn(r, "aggravators", a)}
                    >
                      {a}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field label="Pain severity right now">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  value={c.nrs}
                  onChange={(e) => setComplaint(r, { nrs: Number(e.target.value) })}
                  aria-valuetext={`Pain Level: ${c.nrs} out of 10 - ${nrsLabel(c.nrs)}`}
                  className="w-full accent-[var(--color-primary)]"
                />
                <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                  <span>0 · No Pain</span>
                  <span>5 · Moderate</span>
                  <span>10 · Worst Imaginable</span>
                </div>
                <p className="mt-2 text-sm font-medium">
                  {c.nrs} / 10 — {nrsLabel(c.nrs)}
                </p>
              </Field>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between gap-3">
        <GhostButton onClick={() => navigate({ to: "/onboarding" })}>
          <ArrowLeft className="size-4" /> Back
        </GhostButton>
        <PrimaryButton
          onClick={() => navigate({ to: "/onboarding/red-flags" })}
          disabled={regions.length === 0}
        >
          Continue to safety check <ArrowRight className="size-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}
