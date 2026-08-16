"use client";
import { useState } from "react";
import { GitBranch, Search, ArrowRight, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { graphApi } from "@/api/graph.api";
import type { GraphPath } from "@/types/api";

interface PathFinderProps {
  onPathFound: (path: GraphPath) => void;
}

export function PathFinder({ onPathFound }: PathFinderProps) {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFindPath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromId || !toId) {
      toast.error("Please enter both source and destination IDs");
      return;
    }

    setIsLoading(true);
    try {
      const path = await graphApi.path(fromId, toId);
      onPathFound(path);
      toast.success(`Path found! Distance: ${path.distance} hops`);
    } catch (error) {
      toast.error("No path found between these nodes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-indigo-500/5 p-3 border border-indigo-500/20">
        <div className="flex gap-2 text-indigo-400">
          <Info size={16} className="shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            Find the shortest connection between any two developers or nodes in the knowledge graph.
          </p>
        </div>
      </div>

      <form onSubmit={handleFindPath} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">From Node</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              placeholder="Paste Source ID..."
              className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-xs outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="h-4 w-px bg-white/10" />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">To Node</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              placeholder="Paste Destination ID..."
              className="h-9 w-full rounded-md border border-white/10 bg-white/5 pl-9 pr-3 text-xs outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating Path...
            </>
          ) : (
            <>
              <GitBranch className="mr-2 h-4 w-4" />
              Find Shortest Path
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
