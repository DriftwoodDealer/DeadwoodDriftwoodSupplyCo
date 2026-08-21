import type { InventoryStatus } from "@/lib/mock-inventory";

type StatusPillProps = {
  status: InventoryStatus | string;
};

export function StatusPill({ status }: StatusPillProps) {
  return <span className="pill">{status}</span>;
}
