import type { ScoreDimension } from "../../prisma/seed-data/types";

export interface SimNodeChoice {
  label: string;
  effect: string;
  nextNodeId: string;
  scores: Partial<Record<ScoreDimension, number>>;
}

export interface SimNode {
  id: string;
  scene: string;
  context?: string;
  choices: SimNodeChoice[];
}

export interface SimGraph {
  startNodeId: string;
  nodes: Record<string, SimNode>;
  debriefGood: string;
  debriefRisky: string;
}

export const SCORE_DIMENSION_LABELS: Record<ScoreDimension, string> = {
  safety: "Keamanan",
  empathy: "Empati",
  communication: "Komunikasi",
  classroomManagement: "Manajemen Kelas",
  childAgency: "Otonomi Anak",
  pedagogy: "Relevansi Pedagogis",
};

export function summarizeScores(scores: Partial<Record<ScoreDimension, number>>): {
  dimension: ScoreDimension;
  label: string;
  value: number;
  tone: "success" | "warning" | "danger";
}[] {
  return (Object.keys(SCORE_DIMENSION_LABELS) as ScoreDimension[]).map((dim) => {
    const value = scores[dim] ?? 0;
    return {
      dimension: dim,
      label: SCORE_DIMENSION_LABELS[dim],
      value,
      tone: value > 0 ? "success" : value < 0 ? "danger" : "warning",
    };
  });
}
