"use client";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Edge,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Maximize2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GraphCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodeClick: (node: Node) => void;
  isLoading?: boolean;
}

const nodeColors: Record<string, string> = {
  developer: "#06b6d4",
  project: "#6366f1",
  technology: "#10b981",
  company: "#f59e0b",
  skill: "#ec4899",
  repository: "#8b5cf6",
  topic: "#f97316",
};

export function GraphCanvas({
  nodes,
  edges,
  onNodeClick,
  isLoading,
}: GraphCanvasProps) {
  const onNodeClickInternal = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeClick(node);
    },
    [onNodeClick],
  );

  const flowNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style: {
        background: nodeColors[node.data?.type as string] || "#64748b",
        color: "#0f172a",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "12px",
        padding: "10px 16px",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        minWidth: "120px",
        textAlign: "center" as const,
      },
    }));
  }, [nodes]);

  const flowEdges = useMemo(() => {
    return edges.map((edge) => ({
      ...edge,
      animated: true,
      style: { stroke: "rgba(148, 163, 184, 0.3)", strokeWidth: 2 },
      labelStyle: { fill: "#94a3b8", fontSize: 10, fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "rgba(148, 163, 184, 0.3)",
      },
    }));
  }, [edges]);

  return (
    <div className="relative h-full w-full bg-[#070b14]">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Zap className="h-8 w-8 animate-pulse text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">
              Syncing graph data...
            </span>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodeClick={onNodeClickInternal}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
      >
        <Background
          color="#1e293b"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
        />
        <Controls
          className="bg-slate-900 border-white/10 fill-white"
          showInteractive={false}
        />
        <MiniMap
          className="bg-slate-900 border-white/10"
          nodeColor={(n) => nodeColors[n.data?.type as string] || "#64748b"}
          maskColor="rgba(0, 0, 0, 0.5)"
        />

        <Panel position="top-right" className="flex flex-col gap-2">
          <div className="rounded-lg border border-white/10 bg-slate-950/80 p-3 backdrop-blur-md">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Legend
            </p>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(nodeColors)
                .slice(0, 3)
                .map(([type, color]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[11px] capitalize text-slate-300">
                      {type}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
