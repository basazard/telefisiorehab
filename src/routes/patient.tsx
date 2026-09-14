import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  ClipboardCheck,
  Video,
  Repeat,
  Timer,
  Gauge,
  Bell,
  Activity,
  LineChart,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/DashboardShell";

export const Route = createFileRoute("/patient")({
  component: PatientLayout,
});

export const patientNav: NavItem[] = [
  { label: "Assessment", to: "/patient", icon: ClipboardCheck },
  { label: "Video", to: "/patient/video", icon: Video },
  { label: "Repetition Indicator", to: "/patient/repetitions", icon: Repeat },
  { label: "Exercise Duration", to: "/patient/duration", icon: Timer },
  { label: "Compliance Bar", to: "/patient/compliance", icon: Gauge },
  { label: "Exercise Reminder", to: "/patient/reminders", icon: Bell },
  { label: "Compliance Recording", to: "/patient/recording", icon: Activity },
  { label: "Functional Graphics", to: "/patient/graphics", icon: LineChart },
];

function PatientLayout() {
  return (
    <DashboardShell role="Patient" userName="Amelia Chen" nav={patientNav}>
      <Outlet />
    </DashboardShell>
  );
}
