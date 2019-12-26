import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { EditSettingsModel } from '@syncfusion/ej2-angular-gantt';
import { GanttTask } from './GanttTask.model';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';
import { Project } from '../service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-project-gant-new',
	templateUrl: './project-gant-new.component.html',
	styleUrls: ['./project-gant-new.component.css']
})
export class ProjectGantNewComponent implements OnInit {
	data: GanttTask[];
	project: Project;
	errorMsg: string;
	public taskSettings: object;
	public timelineSettings: object;
	public columns: object[];
	public toolbar: any;
	public editSettings: EditSettingsModel;
	private id: string;

	constructor(private route: ActivatedRoute, private http: HttpClient, private spinner: NgxSpinnerService) {
		this.route.queryParams.subscribe((params) => {
			this.id = params.id;
		});

		this.http
			.get(config.urlBack + '/api/projects/project/' + this.id, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => {
					this.setProject(res);
					console.log('project gantt: current project = ' + this.project.foreskiz_date);
				},
				(error) => {
					this.errorMsg = error.error.message;
					console.log(error);
				}
			);
	}

	setProject(project) {
		this.project = project;
		this.data = [
			{
				id: 1,
				name: this.project.name,
				startDate: new Date(this.project.foreskiz_date),
				subtasks: [
					{
						id: 2,
						name:
							'Одобрение или отказ Правлением АО «СПК Астана» в рассмотрении заявки и анкеты на 1-й этапе рассмотрения инвест. проектов',
						duration: 4,
						progress: 100
					},
					{
						id: 3,
						name: 'Корректировка плана детальной планировки;( В случае необходимости корректировки)',
						duration: 4,
						progress: 0,
						predecessor: '2FS'
					},
					{
						id: 4,
						name: 'Заявка от АО «СПК Астана» в ЦОН по предоставлению участка',
						duration: 4,
						progress: 0,
						predecessor: '3FS'
					},
					{
						id: 5,
						name:
							'Заявление от АО «СПК Астана» в ЦОН (2-ой этап) о предоставления права на земельный участок для целей строительства объект',
						duration: 4,
						progress: 0,
						predecessor: '4FS'
					},
					{
						id: 6,
						name:
							'Заявление от АО «СПК Астана» в Акимат г. Нур-Султан о предоставлении права на земельный участок для целей строительства объектав долгосрочную аренду сроком на 5 лет',
						duration: 4,
						progress: 0,
						predecessor: '5FS'
					},
					{
						id: 7,
						name:
							'Заявление от АО «СПК Астана»:- получение Акта установления границ, - присвоение адреса, - получение оценки - определение кадастровой стоимости земельного участка',
						duration: 4,
						progress: 0,
						predecessor: '6FS'
					},
					{
						id: 8,
						name: 'Заявление от АО «СПК Астана» на разработку землеустроительного проекта',
						duration: 4,
						progress: 0,
						predecessor: '7FS'
					},
					{
						id: 9,
						name: 'Заявление от АО «СПК Астана» на утверждение землеустроительного проекта',
						duration: 4,
						progress: 0,
						predecessor: '8FS'
					},
					{
						id: 10,
						name: 'Получение договора выкупа права',
						duration: 4,
						progress: 0,
						predecessor: '9FS'
					},
					{
						id: 11,
						name: 'Заявление от АО «СПК Астана» в ЦОН о получении идентификационного документа',
						duration: 4,
						progress: 0,
						predecessor: '10FS'
					},
					{
						id: 12,
						name: 'Регистрация прав на земельный участок',
						duration: 4,
						progress: 0,
						predecessor: '11FS'
					}
				]
			}
		];
		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		}, 1000);
	}
	ngOnInit() {
		this.spinner.show();
		this.data = [];
		this.taskSettings = {
			id: 'id',
			name: 'name',
			startDate: 'startDate',
			endDate: 'endDate',
			duration: 'duration',
			progress: 'progress',
			dependency: 'predecessor',
			child: 'subtasks'
		};
		this.timelineSettings = {
			topTier: {
				format: 'MMM dd, yyyy',
				unit: 'Month'
			},
			bottomTier: {
				unit: 'Week'
			}
		};
		this.columns = [
			{ field: 'name', headerText: 'Task Name', width: '400' },
			{ field: 'id', headerText: 'ID', textAlign: 'Left', width: '80' },
			{ field: 'startDate', headerText: 'Start Date', width: '150' },
			{ field: 'duration', headerText: 'Duration', width: '150' },
			{ field: 'progress', headerText: 'Progress', width: '150' }
		];

		this.editSettings = {
			allowEditing: true,
			mode: 'Dialog'
		};

		this.toolbar = ['Edit', { text: 'Save', tooltipText: 'Save', id: 'save', align: 'left' }];
	}

	public toolbarClick(args: ClickEventArgs): void {
		if (args.item.id === 'save') {
			this.save();
			alert('Saved!');
		}
	}
	save() {
		console.log(this.data);
	}
}
