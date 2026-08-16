"use client";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Cpu,
  FolderCode,
  Copy,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { Developer } from "@/types/developer";

type NodeDetailEntity = {
  id?: string;
  type?: string;
  name?: string;
  headline?: string;
  email?: string;
  location?: string;
  category?: string;
  description?: string;
  skills?: Array<{ id?: string; name?: string }>;
};

export function NodeDetails({
  entity,
  isLoading,
}: {
  entity: NodeDetailEntity | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Separator className="my-4" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <ShieldCheck className="mb-4 h-12 w-12 opacity-10" />
        <p className="text-sm font-medium">Select a node to inspect</p>
        <p className="text-xs">Explore the graph to see details</p>
      </div>
    );
  }

  const copyId = () => {
    if (entity.id) {
      navigator.clipboard.writeText(entity.id);
      toast.success("Node ID copied to clipboard");
    }
  };

  const type = entity.type || "developer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-slate-950",
              type === "developer"
                ? "bg-cyan-400"
                : type === "project"
                  ? "bg-indigo-400"
                  : "bg-emerald-400",
            )}
          >
            {type === "developer" ? (
              <User />
            ) : type === "project" ? (
              <FolderCode />
            ) : (
              <Cpu />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {entity.name}
            </h3>
            <Badge variant="secondary" className="mt-1 h-5 capitalize">
              {type}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={copyId} title="Copy ID">
          <Copy size={14} className="text-slate-500 hover:text-white" />
        </Button>
      </header>

      <div className="space-y-3 text-sm">
        {entity.headline && (
          <div className="flex items-start gap-2 text-slate-300">
            <Briefcase size={14} className="mt-0.5 shrink-0 text-slate-500" />
            <p>{entity.headline}</p>
          </div>
        )}
        {entity.email && (
          <div className="flex items-center gap-2 text-slate-300">
            <Mail size={14} className="shrink-0 text-slate-500" />
            <p>{entity.email}</p>
          </div>
        )}
        {entity.location && (
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={14} className="shrink-0 text-slate-500" />
            <p>{entity.location}</p>
          </div>
        )}
        {entity.category && (
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu size={14} className="shrink-0 text-slate-500" />
            <p>{entity.category}</p>
          </div>
        )}
      </div>

      {entity.description && (
        <div className="rounded-lg bg-white/5 p-3 text-sm text-slate-400">
          {entity.description}
        </div>
      )}

      {entity.skills && entity.skills.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {entity.skills.map((skill) => (
              <Badge
                key={skill.id ?? skill.name ?? "skill"}
                variant="outline"
                className="bg-white/5"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator className="bg-white/10" />

      <div className="grid gap-2">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => {}}
        >
          Explore Full Network
          <ChevronRight size={14} />
        </Button>
      </div>
    </motion.div>
  );
}

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}
