import Explorer from "@/components/Explorer";
import { Suspense } from "react";
export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-300">
          Loading graph workspace…
        </div>
      }
    >
      <Explorer />
    </Suspense>
  );
}
