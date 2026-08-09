export type ConstructionStatus =
  | "COMPLETED"
  | "IN PROGRESS"
  | "NOT STARTED"
  | "ON HOLD";

export interface ConstructionActivity {
  id: string;
  title: string;
  project: string;
  block: string;
  engineer: string;
  progress: number;
  startDate: string;
  completionDate: string;
  workers: number;
  status: ConstructionStatus;
}