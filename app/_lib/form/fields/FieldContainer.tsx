import type { ReactNode } from "react";

type FieldContainerProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export default function FieldContainer({
  label,
  children,
  className = "flex flex-col",
}: FieldContainerProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}
