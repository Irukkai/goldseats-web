import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card border-line bg-ink-card shadow-card border p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-cream text-lg font-semibold">{children}</h3>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return (
    <p className="text-cream-muted mt-2 text-sm leading-relaxed">{children}</p>
  );
}
