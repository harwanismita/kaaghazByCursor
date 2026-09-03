import { cn } from "@/lib/utils";

function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-[#6b4f3a] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
