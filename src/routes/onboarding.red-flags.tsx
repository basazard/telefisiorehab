import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Hospital, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useOnboarding } from "@/components/OnboardingProvider";
import { GhostButton } from "@/components/onboarding-ui";
import { RED_FLAG_QUESTIONS } from "@/lib/onboarding";
import { logRedFlagEvent } from "@/lib/api/safety.functions";

export const Route = createFileRoute("/onboarding/red-flags")({
  head: () => ({
    meta: [
      { title: "Safety Check — TeleFisioRehab" },
      {
        name: "description",
        content:
          "A 14-question emergency screening that stops the program if urgent medical care is needed.",
      },
      { property: "og:title", content: "Safety Check — TeleFisioRehab" },
      {
        property: "og:description",
        content: "Emergency red-flag screening before any exercise program is assigned.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RedFlagsPage,
});

function RedFlagsPage() {
  const { state, update } = useOnboarding();
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const flagged = state.redFlags.flagged;
  const emergency = flagged.length > 0;

  const answer = (value: "yes" | "no") => {
    update((s) => {
      const answers = { ...s.redFlags.answers, [i]: value };
      const nextFlagged = Object.entries(answers)
        .filter(([, v]) => v === "yes")
        .map(([k]) => Number(k));
      return {
        ...s,
        redFlags: {
          ...s.redFlags,
          answers,
          flagged: nextFlagged,
          cleared: nextFlagged.length === 0 && Object.keys(answers).length === RED_FLAG_QUESTIONS.length,
        },
      };
    });

    if (value === "yes") return;
    if (i + 1 < RED_FLAG_QUESTIONS.length) setI(i + 1);
    else navigate({ to: "/onboarding/assessment" });
  };

  const current = RED_FLAG_QUESTIONS[i];

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Question {i + 1} of {RED_FLAG_QUESTIONS.length} • Safety Check
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">{current}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Answer honestly. This check keeps you safe before any exercise is suggested.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => answer("yes")}
          className="rounded-2xl border-2 border-primary bg-card px-6 py-10 font-display text-2xl font-bold text-primary hover:bg-secondary"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => answer("no")}
          className="rounded-2xl border-2 border-border bg-card px-6 py-10 font-display text-2xl font-bold hover:bg-secondary"
        >
          No
        </button>
      </div>

      <div>
        {i > 0 ? (
          <GhostButton onClick={() => setI(i - 1)}>
            <ArrowLeft className="size-4" /> Previous question
          </GhostButton>
        ) : (
          <GhostButton onClick={() => navigate({ to: "/onboarding/screening" })}>
            <ArrowLeft className="size-4" /> Back to screening
          </GhostButton>
        )}
      </div>

      {emergency && <EmergencyModal />}
    </div>
  );
}

function EmergencyModal() {
  const { state, update } = useOnboarding();
  const [ack, setAck] = useState(false);
  const [loggedAt] = useState(() =>
    new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta", hour12: false }),
  );

  useEffect(() => {
    const block = (e: KeyboardEvent) => {
      if (e.key === "Escape") e.preventDefault();
    };
    document.addEventListener("keydown", block, true);
    document.body.style.overflow = "hidden";
    void logRedFlagEvent({
      data: {
        name: state.profile.name,
        flaggedQuestionIds: state.redFlags.flagged,
        occurredAt: new Date().toISOString(),
      },
    }).catch(() => undefined);
    return () => {
      document.removeEventListener("keydown", block, true);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="Emergency stop"
      className="fixed inset-0 z-50 overflow-y-auto bg-background p-6"
    >
      <div className="mx-auto flex min-h-full max-w-md flex-col justify-center gap-6 py-10 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-destructive text-destructive-foreground">
          <AlertTriangle className="size-8" />
        </div>
        <h2 className="font-display text-3xl font-extrabold text-destructive">
          STOP — SEEK IMMEDIATE MEDICAL CARE
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your answers, you may need urgent medical attention. This app cannot safely help
          you right now.
        </p>
        <p className="font-semibold">DO NOT attempt any exercises.</p>

        <a
          href="tel:112"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-destructive px-6 py-4 font-semibold text-destructive-foreground"
        >
          <Phone className="size-5" /> CALL EMERGENCY (112)
        </a>
        <a
          href="https://www.google.com/maps/search/nearest+hospital"
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-destructive px-6 py-4 font-semibold text-destructive"
        >
          <Hospital className="size-5" /> FIND NEAREST HOSPITAL
        </a>

        <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left text-sm">
          <input
            type="checkbox"
            checked={ack}
            onChange={(e) => setAck(e.target.checked)}
            className="mt-0.5 size-4 accent-[var(--color-destructive)]"
          />
          <span>I understand I must seek immediate emergency care.</span>
        </label>

        <p className="text-[11px] text-muted-foreground">
          Logged: {loggedAt} WIB • Flagged items:{" "}
          {state.redFlags.flagged.map((f) => f + 1).join(", ")}
        </p>

        {ack ? (
          <Link
            to="/"
            onClick={() =>
              update((s) => ({
                ...s,
                redFlags: { ...s.redFlags, acknowledgedAt: new Date().toISOString() },
              }))
            }
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground"
          >
            Return to Home
          </Link>
        ) : (
          <p className="text-xs text-muted-foreground">
            Tick the box above to close this screen. No exercise content is available.
          </p>
        )}
      </div>
    </div>
  );
}
