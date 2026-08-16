import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export function ErrorState({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
        className,
      )}
    >
      <AlertCircle className="h-4 w-4" />
      <span>
        {message ?? "Something went wrong while loading this section."}
      </span>
    </div>
  );
}
