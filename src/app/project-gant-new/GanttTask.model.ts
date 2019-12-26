export interface GanttTask {
	id: string | number;
	name: string;
	startDate?: Date;
	duration?: number;
	progress?: number;
	subtasks?: GanttTask[];
	predecessor?: string;
	endDate?: Date;
}
