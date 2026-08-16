import { GraphEntity, NodeType } from "./api";
import { Node, Edge } from "reactflow";

export type GraphNode = Node<{
  label: string;
  type: NodeType;
  entity: GraphEntity;
}>;

export type GraphEdge = Edge<{
  label: string;
}>;
