"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  ChevronRight,
  Code2,
  GitBranch,
  Lightbulb,
  LogOut,
  Menu,
  Moon,
  Network,
  Search,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import {
  useEntity,
  useNetwork,
  useRecommendations,
  useSearch,
} from "@/hooks/useGraph";
import { graphApi } from "@/api/graph.api";
import type { GraphEntity, GraphPath, NodeType } from "@/types/api";

// Imported reusable components
import { Sidebar } from "@/components/layout/Sidebar";
import { DeveloperList } from "@/components/developer/DeveloperList";
import { ProjectList } from "@/components/project/ProjectList";
import { TechnologyList } from "@/components/technology/TechnologyList";

// Import list hooks
import { useDevelopers } from "@/hooks/useDevelopers";
import { useProjects } from "@/hooks/useProjects";
import { useTechnologies } from "@/hooks/useTechnologies";

const colors: Record<string, string> = {
  developer: "#38bdf8",
  project: "#818cf8",
  technology: "#2dd4bf",
  company: "#fbbf24",
  skill: "#fb7185",
  repository: "#a78bfa",
  topic: "#f97316",
};

const label = (value?: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "Node";

function entityType(entity: GraphEntity): NodeType {
  return (entity.type ??
    (entity.category ? "technology" : "developer")) as NodeType;
}

// Helper to extract a flat list of entities from any search response shape
function normalizeSearchResults(data: unknown): GraphEntity[] {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map((item) => {
      if (item && typeof item === "object" && "item" in item) {
        return item.item as GraphEntity;
      }
      return item as GraphEntity;
    });
  }
  if (typeof data === "object" && "data" in data) {
    const nested = (data as { data?: unknown }).data;
    if (Array.isArray(nested)) {
      return normalizeSearchResults(nested);
    }
  }
  if (typeof data === "object" && "items" in data) {
    const items = (data as { items?: unknown }).items;
    if (Array.isArray(items)) {
      return normalizeSearchResults(items);
    }
  }
  return [];
}

export default function Explorer() {
  const router = useRouter();
  const params = useSearchParams();
  const { ready, user } = useAuth();

  // Active tab from URL (developers, projects, technologies)
  const activeTab = params.get("tab");

  // List hooks
  const developers = useDevelopers();
  const projects = useProjects();
  const technologies = useTechnologies();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [debounced, setDebounced] = useState(query);
  const [selected, setSelected] = useState<GraphEntity | null>(() => {
    const id = params.get("nodeId"),
      type = params.get("nodeType");
    return id && type
      ? { id, name: "Selected node", type: type as NodeType }
      : null;
  });
  const [mobileNav, setMobileNav] = useState(false);
  const [path, setPath] = useState<GraphPath | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [finding, setFinding] = useState(false);

  // Search
  const search = useSearch(debounced);
  const searchResults = useMemo(
    () => normalizeSearchResults(search.data),
    [search.data],
  );

  const type = selected ? entityType(selected) : null;
  const detail = useEntity(type, selected?.id ?? null);
  const network = useNetwork(
    type === "developer" ? (selected?.id ?? null) : null,
  );
  const recommendations = useRecommendations(selected?.id ?? null);

  // Debounce search query
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(query), 280);
    return () => clearTimeout(timeout);
  }, [query]);

  // Redirect if not authenticated
  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  // Open a node and update URL
  const open = useCallback(
    (entity: GraphEntity) => {
      const resolved = { ...entity, type: entityType(entity) };
      setSelected(resolved);
      setPath(null);
      setQuery("");
      router.replace(
        `/explorer?nodeType=${resolved.type}&nodeId=${resolved.id}`,
        { scroll: false },
      );
    },
    [router],
  );

  // React Flow node/edge types (no custom types)
  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  // Build graph nodes/edges
  const graph = useMemo(() => {
    if (!selected) return { nodes: [] as Node[], edges: [] as Edge[] };
    const center: Node = {
      id: selected.id,
      position: { x: 270, y: 180 },
      data: { label: selected.name },
      style: {
        background: colors[type ?? "developer"],
        color: "#07111f",
        borderRadius: 14,
        border: "2px solid white",
        padding: "12px 18px",
        fontWeight: 700,
        boxShadow: "0 0 30px #38bdf855",
      },
    };

    const networkNodes = network.data?.nodes ?? [];
    const pathNodes =
      path?.nodes
        .filter((n) => n.id !== selected.id)
        .map((n) => ({ entity: n })) ?? [];
    const peers =
      networkNodes
        .filter((n) => n.id !== selected.id)
        .map((entity, index) => ({ entity, index })) ?? [];
    const items = peers.length
      ? peers
      : pathNodes.map((item, index) => ({ ...item, index }));

    const nodes = [
      center,
      ...items.map(({ entity, index }) => ({
        id: entity.id,
        position: { x: 80 + (index % 3) * 210, y: index < 3 ? 40 : 370 },
        data: { label: entity.name },
        style: {
          background: colors[entityType(entity)],
          color: "#07111f",
          borderRadius: 12,
          padding: "10px 14px",
          fontWeight: 650,
          border: "1px solid #ffffffaa",
        },
      })),
    ];

    const edges = path?.relationships
      ? path.relationships.map((relationship, index) => ({
          id: `path-${index}`,
          source: path.nodes[index]?.id ?? selected.id,
          target: path.nodes[index + 1]?.id ?? selected.id,
          label: String(relationship.type || "related").replace(/_/g, " "),
          animated: true,
          style: { stroke: "#22d3ee", strokeWidth: 3 },
          labelStyle: { fill: "#94a3b8", fontSize: 11 },
        }))
      : (network.data?.edges ?? []).map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: String(edge.type || "related").replace(/_/g, " "),
          animated: false,
          style: { stroke: "#64748b", strokeWidth: 1.5 },
          labelStyle: { fill: "#94a3b8", fontSize: 11 },
        }));

    return { nodes, edges };
  }, [selected, network.data, path, type]);

  // Find path handler
  const findPath = async () => {
    if (!from || !to) return toast.error("Choose both node IDs first.");
    setFinding(true);
    try {
      const result = await graphApi.path(from, to);
      setPath(result);
      const start = result.nodes[0];
      if (start) setSelected({ ...start, type: entityType(start) });
      toast.success(
        `${result.distance} hop${result.distance === 1 ? "" : "s"} found`,
      );
    } catch {
      setPath(null);
      toast.error("No connection found between these nodes.");
    } finally {
      setFinding(false);
    }
  };

  if (!ready || !user)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-slate-300">
        Preparing your workspace…
      </div>
    );

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#07111f] dark:text-slate-100 lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden h-full w-64 shrink-0 lg:block">
        <Sidebar className="h-full" />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/50 lg:hidden">
          <button aria-label="Open menu" onClick={() => setMobileNav(true)}>
            <Menu />
          </button>
          <span className="font-semibold">GraphSphere</span>
          <span className="size-8 rounded-full bg-cyan-400" />
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-7">
          <div className="mx-auto max-w-[1600px]">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                  KNOWLEDGE GRAPH
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Explore connections with context.
                </h1>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400" />
                Live graph
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Search
                className="absolute left-4 top-3.5 text-slate-400"
                size={19}
              />
              <input
                aria-label="Search graph"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search developers, projects, technologies…"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 dark:border-white/10 dark:bg-slate-900"
              />
              {query && (
                <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-slate-900">
                  {search.isFetching && (
                    <p className="p-3 text-sm text-slate-500">
                      Searching graph…
                    </p>
                  )}
                  {search.isError && (
                    <p className="p-3 text-sm text-rose-500">
                      Unable to search right now.
                    </p>
                  )}
                  {searchResults.length === 0 && (
                    <p className="p-3 text-sm text-slate-500">
                      No matching nodes.
                    </p>
                  )}
                  {searchResults.map((item) => (
                    <button
                      onClick={() => open(item)}
                      key={item.id}
                      className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <span
                        className="size-2 rounded-full"
                        style={{ background: colors[entityType(item)] }}
                      />
                      <span className="flex-1 font-medium">{item.name}</span>
                      <span className="text-xs text-slate-500">
                        {label(entityType(item))}
                      </span>
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active tab: Developers / Projects / Technologies list */}
            {activeTab && (
              <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-950">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                      Graph resources
                    </p>
                    <h2 className="text-xl font-semibold">
                      {activeTab === "developers" && "Developers"}
                      {activeTab === "projects" && "Projects"}
                      {activeTab === "technologies" && "Technologies"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      router.replace("/explorer", { scroll: false })
                    }
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-300"
                  >
                    Back to explorer
                  </button>
                </div>

                {activeTab === "developers" && (
                  <DeveloperList
                    developers={developers.data ?? []}
                    isLoading={developers.isLoading}
                    isError={developers.isError}
                    onSelect={(developer) =>
                      open({
                        id: developer.id,
                        name: developer.name,
                        type: "developer",
                      })
                    }
                  />
                )}

                {activeTab === "projects" && (
                  <ProjectList
                    projects={projects.data ?? []}
                    isLoading={projects.isLoading}
                    isError={projects.isError}
                    onSelect={(project) =>
                      open({
                        id: project.id,
                        name: project.name,
                        type: "project",
                      })
                    }
                  />
                )}

                {activeTab === "technologies" && (
                  <TechnologyList
                    technologies={technologies.data ?? []}
                    isLoading={technologies.isLoading}
                    isError={technologies.isError}
                    onSelect={(technology) =>
                      open({
                        id: technology.id,
                        name: technology.name,
                        type: "technology",
                      })
                    }
                  />
                )}
              </section>
            )}

            {/* Graph + Details (2 columns) */}
            <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
              {/* Graph canvas */}
              <section className="min-h-[510px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Network size={18} className="text-cyan-500" />
                    Graph canvas
                  </div>
                  <span className="text-xs text-slate-500">
                    {graph.nodes.length || "No"} nodes
                  </span>
                </div>
                <div className="h-[440px]">
                  {selected ? (
                    <ReactFlow
                      nodes={graph.nodes}
                      edges={graph.edges}
                      nodeTypes={nodeTypes}
                      edgeTypes={edgeTypes}
                      onNodeClick={(_, n) => {
                        const match =
                          path?.nodes.find((x) => x.id === n.id) ??
                          network.data?.nodes.find((x) => x.id === n.id);
                        if (match) open(match);
                      }}
                      fitView
                      minZoom={0.3}
                    >
                      <Background color="#334155" gap={20} />
                      <Controls />
                      <MiniMap
                        nodeColor={(n) =>
                          String(n.style?.background ?? "#38bdf8")
                        }
                      />
                    </ReactFlow>
                  ) : (
                    <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,_#0ea5e922,_transparent_50%)] text-center">
                      <div>
                        <BrainCircuit
                          className="mx-auto mb-4 text-cyan-400"
                          size={42}
                        />
                        <h2 className="text-lg font-semibold">
                          Start with a graph node
                        </h2>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                          Search for a developer, project, or technology to
                          reveal its connections.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Right sidebar: Node details, Path, Recommendations */}
              <aside className="space-y-5">
                {/* Node details */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                  <div className="mb-4 flex items-center gap-2 font-semibold">
                    <UserRound size={18} className="text-indigo-500" />
                    Node details
                  </div>
                  {detail.isFetching ? (
                    <div className="space-y-3">
                      <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                      <div className="h-3 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                      <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                    </div>
                  ) : selected ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span
                          className="size-10 rounded-xl"
                          style={{ background: colors[type ?? "developer"] }}
                        />
                        <div>
                          <p className="font-semibold">
                            {detail.data?.name ?? selected.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {label(type ?? "developer")}
                          </p>
                        </div>
                      </div>
                      {detail.data &&
                        Object.entries(detail.data)
                          .filter(
                            ([k, v]) =>
                              ![
                                "id",
                                "name",
                                "type",
                                "skills",
                                "projects",
                                "technologies",
                                "developers",
                              ].includes(k) &&
                              typeof v !== "object" &&
                              v != null,
                          )
                          .slice(0, 5)
                          .map(([k, v]) => (
                            <p
                              className="mb-1 text-sm text-slate-600 dark:text-slate-400"
                              key={k}
                            >
                              <span className="capitalize">
                                {k.replace(/([A-Z])/g, " $1")}
                              </span>
                              : {String(v)}
                            </p>
                          ))}
                      <button
                        onClick={() =>
                          navigator.clipboard
                            .writeText(selected.id)
                            .then(() => toast.success("Node ID copied"))
                        }
                        className="mt-4 text-xs font-medium text-cyan-600 dark:text-cyan-300"
                      >
                        Copy node ID
                      </button>
                    </motion.div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Select a node to inspect its graph context.
                    </p>
                  )}
                </section>

                {/* Shortest path */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                  <div className="mb-3 flex items-center gap-2 font-semibold">
                    <GitBranch size={18} className="text-fuchsia-500" />
                    Find shortest path
                  </div>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From node ID"
                    className="mb-2 h-9 w-full rounded-lg border border-slate-200 bg-transparent px-3 text-xs dark:border-white/10"
                  />
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To node ID"
                    className="mb-3 h-9 w-full rounded-lg border border-slate-200 bg-transparent px-3 text-xs dark:border-white/10"
                  />
                  <button
                    disabled={finding}
                    onClick={findPath}
                    className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
                  >
                    {finding ? "Finding…" : "Find path"}
                  </button>
                  {path && (
                    <p className="mt-3 text-xs text-cyan-600 dark:text-cyan-300">
                      {path.distance} hops ·{" "}
                      {path.relationships.map((r) => r.type).join(" → ")}
                    </p>
                  )}
                </section>

                {/* Recommendations */}
                {selected && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
                    <div className="mb-3 flex items-center gap-2 font-semibold">
                      <Lightbulb size={18} className="text-amber-400" />
                      Recommendations
                    </div>
                    {recommendations.isFetching && (
                      <div className="space-y-2">
                        <div className="h-14 animate-pulse rounded-lg bg-slate-100 dark:bg-white/5" />
                        <div className="h-14 animate-pulse rounded-lg bg-slate-100 dark:bg-white/5" />
                      </div>
                    )}
                    {recommendations.isError && (
                      <p className="text-sm text-rose-500">
                        Recommendations are temporarily unavailable.
                      </p>
                    )}
                    {!recommendations.isFetching &&
                      !recommendations.isError && (
                        <>
                          {!recommendations.data ||
                          recommendations.data.length === 0 ? (
                            <p className="text-sm text-slate-500">
                              No recommendations yet.
                            </p>
                          ) : (
                            recommendations.data.slice(0, 4).map((item) => (
                              <button
                                key={`${item.type}-${item.id}`}
                                onClick={() =>
                                  open({
                                    id: item.id,
                                    name: item.name,
                                    type: item.type,
                                  })
                                }
                                className="mb-2 w-full rounded-lg border border-slate-100 p-3 text-left transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:hover:bg-cyan-400/5"
                              >
                                <p className="text-sm font-medium">
                                  {item.name}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                  {item.reason ?? label(item.type)}
                                  {item.score != null
                                    ? ` · score ${item.score}`
                                    : ""}
                                </p>
                              </button>
                            ))
                          )}
                        </>
                      )}
                  </section>
                )}
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar (slide-in) */}
      <AnimatePresence>
        {mobileNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 shadow-2xl lg:hidden"
          >
            <button
              onClick={() => setMobileNav(false)}
              className="absolute right-4 top-4 z-10 text-slate-400"
              aria-label="Close menu"
            >
              <X />
            </button>
            <Sidebar
              className="h-full w-full"
              close={() => setMobileNav(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
