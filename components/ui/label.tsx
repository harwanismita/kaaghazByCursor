import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium text-[#2e2a27]", className)}
      {...props}
    />
  );
}

export { Label };
