import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  primary?: boolean;
};

export default function Button({
  children,
  primary,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-lg border px-6 py-2 font-medium transition-colors duration-200 ${primary ? "border-transparent bg-accent text-white hover:opacity-90" : "border-border bg-surface text-foreground hover:bg-black/5 dark:hover:bg-white/8"}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children ?? "OK"}
    </button>
  );
}
