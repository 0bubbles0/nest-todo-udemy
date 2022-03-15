/*This is a database table now
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
*/

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
