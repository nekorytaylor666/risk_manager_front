const GanttConfig = {
	taskSettings: {
		id: 'id',
		name: 'name',
		startDate: 'startDate',
		endDate: 'endDate',
		duration: 'duration',
		progress: 'progress',
		dependency: 'predecessor',
		child: 'subtasks'
	},
	timelineSettings: {
		topTier: {
			format: 'MMM dd',
			unit: 'Week'
		},
		bottomTier: {
			unit: 'Day',
			format: 'dd',
			count: 1
		}
	},
	columns: [
		{ field: 'name', headerText: 'Название проекта', width: '400' },
		{ field: 'id', headerText: 'ID', textAlign: 'Left', width: '80' },
		{ field: 'startDate', headerText: 'Дата начала', width: '150' },
		{ field: 'progress', headerText: 'Прогресс', width: '150' }
	],
	editSettings: {
		allowEditing: true,
		mode: 'Dialog'
	},
	toolbar: ['Edit', { text: 'Save', tooltipText: 'Save', id: 'save', align: 'left' }]
};

export { GanttConfig };
// this.taskSettings = {
// 	id: 'id',
// 	name: 'name',
// 	startDate: 'startDate',
// 	endDate: 'endDate',
// 	duration: 'duration',
// 	progress: 'progress',
// 	dependency: 'predecessor',
// 	child: 'subtasks'
// };
// this.timelineSettings = {
// 	topTier: {
// 		format: 'MMM dd, yyyy',
// 		unit: 'Month'
// 	},
// 	bottomTier: {
// 		unit: 'Week'
// 	}
// };
// this.columns = [
// 	{ field: 'name', headerText: 'Task Name', width: '400' },
// 	{ field: 'id', headerText: 'ID', textAlign: 'Left', width: '80' },
// 	{ field: 'startDate', headerText: 'Start Date', width: '150' },
// 	{ field: 'duration', headerText: 'Duration', width: '150' },
// 	{ field: 'progress', headerText: 'Progress', width: '150' }
// ];

// this.editSettings = {
// 	allowEditing: true,
// 	mode: 'Dialog'
// };

// this.toolbar = ['Edit', { text: 'Save', tooltipText: 'Save', id: 'save', align: 'left' }];
