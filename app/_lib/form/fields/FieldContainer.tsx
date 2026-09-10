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
      <label className="text-zinc-600">{label}</label>
      {children}
    </div>
  );
}
