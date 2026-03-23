import type { PRIORITY, STATUS } from "../config/constants";

export type Status = keyof typeof STATUS;
export type Priority = keyof typeof PRIORITY;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline?: string;
  createdAt: number;
  updatedAt?: number;
}
