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
      className={`rounded-lg px-6 py-2 font-medium ${primary ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 hover:bg-gray-300"}${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children ?? "OK"}
    </button>
  );
}
