import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-[#d4c6b8] bg-white px-3 py-2 text-sm text-[#2e2a27] placeholder:text-[#8a7d72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4f3a]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
