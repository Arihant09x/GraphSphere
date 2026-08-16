"use client";
import { motion } from "framer-motion";
import { User, FolderCode, Cpu, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/types/api";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: (id: string, type: string) => void;
}

export function RecommendationCard({
  recommendation,
  onClick,
}: RecommendationCardProps) {
  const type = recommendation.type;

  const iconMap: Record<string, typeof User> = {
    developer: User,
    project: FolderCode,
    technology: Cpu,
  };

  const Icon = iconMap[type] || User;

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Card
        className="group cursor-pointer border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
        onClick={() => onClick(recommendation.id, type)}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              type === "developer"
                ? "bg-cyan-400/10 text-cyan-400"
                : type === "project"
                  ? "bg-indigo-400/10 text-indigo-400"
                  : "bg-emerald-400/10 text-emerald-400",
            )}
          >
            <Icon size={18} />
          </div>
          <ArrowUpRight
            size={14}
            className="text-slate-600 transition-colors group-hover:text-white"
          />
        </div>

        <div className="mt-3">
          <h4 className="font-semibold text-white truncate">
            {recommendation.name}
          </h4>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {recommendation.reason ||
              `Explore this ${type} and its connections.`}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="h-5 text-[10px] uppercase tracking-wider"
          >
            {type}
          </Badge>
          {recommendation.score && (
            <span className="text-[10px] font-bold text-cyan-400">
              {Math.round(recommendation.score)}% Match
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
