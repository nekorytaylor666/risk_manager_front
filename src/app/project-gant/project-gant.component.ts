import { Component, OnInit, Injectable } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as config from '../../../config';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

const URL = config.urlBack + '/api/users/upload';

import { StepFlatNode, Step, Project, Category, Manager, FileS } from '../service/authentication.service';
import { element } from 'protractor';

@Injectable()
export class ChartDatabase {
	id; // chart id
	moment = moment;
	dataChange = new BehaviorSubject<Step>(null);
	storageKey = 'charts';
	errorMsg: string;
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	filter = {};

	states = [
		'1.1 Одобрение или отказ Правлением АО «СПК Астана» в рассмотрении заявки и анкеты на 1-й этапе рассмотрения инвест. проектов',
		'1.2 Корректировка плана детальной планировки;( В случае необходимости корректировки)',
		'1.3 Заявка от АО «СПК Астана» в ЦОН по предоставлению участка',
		'1.4 Заявление от АО «СПК Астана» в ЦОН (2-ой этап) о предоставления права на земельный участок для целей строительства объект',
		'2.1 Заявление от АО «СПК Астана» в Акимат г. Нур-Султан о предоставлении права на земельный участок для целей строительства объектав долгосрочную аренду сроком на 5 лет',
		'2.2 Заявление от АО «СПК Астана»:- получение Акта установления границ, - присвоение адреса, - получение оценки - определение кадастровой стоимости земельного участка',
		'2.3 Заявление от АО «СПК Астана» на разработку землеустроительного проекта',
		'2.4 Заявление от АО «СПК Астана» на утверждение землеустроительного проекта',
		'2.5 Получение договора выкупа права',
		'2.6 Заявление от АО «СПК Астана» в ЦОН о получении идентификационного документа',
		'2.7 Регистрация прав на земельный участок'
	];

	get data(): Step {
		return this.dataChange.value;
	}

	constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
		this.id = 'id';
		let _id = window.location.search.split('&')[0].split('=')[1];
		this.http
			.get(config.urlBack + '/api/projects/project/' + _id, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setProject(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		//this.initialize();
		this.dataChange.asObservable().subscribe((val) => {
			this.saveStorage(val);
		});
	}

	// load local data
	loadStorage() {
		const charts = localStorage.getItem(this.storageKey);
		return JSON.parse(charts);
	}

	// save local data
	saveStorage(val) {
		//const charts = JSON.parse(localStorage.getItem(this.storageKey)) as Array<Step>;
		//charts[this.id] = val;
		if (val.steps) this.project.steps = val.steps;
		if (val.files) this.project.files = val.files;
		if (val.comments) this.project.comments = val.comments;
		if (val.dates.start) this.project.dates.start = val.dates.start;
		if (val.dates.end) this.project.dates.end = val.dates.end;
		if (val.expanded) this.project.expanded = val.expanded;

		this.http
			.put(
				config.urlBack + '/api/projects/' + this.project._id,
				{ project: this.project, gant: this.filter },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					this.setProject2(res);
					/** spinner starts on init */
					this.spinner.show();

					setTimeout(() => {
						/** spinner ends after 5 seconds */
						this.spinner.hide();
					}, 2000);
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		//localStorage.setItem(this.storageKey, JSON.stringify(charts));
	}

	setProject2(res) {
		this.project = res;
	}

	setProject(res) {
		this.project = res;
		const root = {
			name: res.name,
			comments: res.comments,
			files: res.files,
			dates: res.dates,
			steps: res.steps,
			expanded: res.expanded
		};
		const tree = this.buildTree([root], 0); // build tree
		this.dataChange.next(tree[0]); // broadcast data
	}

	/* initialize() {
    const charts = this.loadStorage(); // load storage of charts
    if (charts && charts.length && charts[this.id]) {
      const tree = this.buildTree([charts[this.id]], 0); // build tree
      this.dataChange.next(tree[0]); // broadcast data
    } else {
      // init a new project
      const start = moment().format('YYYY-MM-DD');
      const end = moment().add(7, 'days').format('YYYY-MM-DD');
      const root = {
        'name': 'Project Name',
        'progress': 0,
        'dates': {
          'start': start,
          'end': end,
        },
        'steps': []
      };
      const tree = this.buildTree([root], 0); // build tree
      this.dataChange.next(tree[0]); // broadcast data
    }
  }*/

	buildTree(steps: Array<any>, level: number): Step[] {
		return steps.map((step: Step) => {
			const newStep = new Step();
			newStep.name = step.name;
			//newStep.progress = step.progress;
			newStep.dates = step.dates;
			newStep.files = step.files;
			newStep.comments = step.comments;
			// build progress dates
			//newStep.progressDates = this.setProgressDates(step);

			newStep.expanded = step.expanded !== undefined ? step.expanded : true;

			if (step.steps.length) {
				newStep.steps = this.buildTree(step.steps, level + 1);
			} else {
				newStep.steps = [];
			}
			return newStep;
		});
	}

	// update progress dates
	setProgressDates(step: Step) {
		const start = this.moment(step.dates.start);
		const end = this.moment(step.dates.end);
		const range = moment.range(start, end);

		// const numDays = Math.round(Array.from(range.by('days')).length * step.progress / 100); // estimated completed days
		const totalDays = Array.from(range.by('days')).map((d) => d.format('YYYY-MM-DD')); // all days in string array
		//return totalDays.splice(0, numDays); // start from 0, get the first len days
	}

	/** step manipulations */
	// update step name
	updateStepName(node: Step, name: string) {
		node.name = name;
		// do not update tree, otherwise will interupt the typing
		this.saveStorage(this.data);
		console.log('data updated');
	}

	updateStep(filter) {
		this.filter = filter;
		this.saveStorage(this.data);
	}
	// add child step
	addChildStep(parent: Step) {
		parent.expanded = true; // set parent node expanded to show children
		if (parent.dates.start != '' && parent.dates.end != '') {
			const child = new Step();
			if (parent.steps.length < 11) child.name = this.states[parent.steps.length];
			else child.name = '';
			// child.progress = 0;
			//child.progressDates = [];
			child.files = [];
			child.comments = [];
			child.dates = {
				start: parent.dates.start,
				end: parent.dates.end
			};
			child.steps = [];
			parent.steps.push(child);
			this.dataChange.next(this.data);
			this.saveStorage(this.data);
			console.log('data updated');
		} else {
			alert('Заполните даты проекта!');
		}
	}

	// delete step
	deleteStep(parent: Step, child: Step) {
		const childIndex = parent.steps.indexOf(child);
		parent.steps.splice(childIndex, 1);
		this.dataChange.next(this.data);
		console.log('data updated');
	}

	// toggle expanded
	toggleExpaned(step: Step) {
		step.expanded = !step.expanded;
		this.saveStorage(this.data);
		console.log('data updated');
	}

	// update progress
	updateProgress(step: Step, progress: number) {
		//step.progress = progress;
		//step.progressDates = this.setProgressDates(step);
		this.saveStorage(this.data);
		console.log('data updated');
		// instead of refreshing whole tree, return progress dates and update the step only
		//return step.progressDates;
	}

	// update date range
	updateDateRange(step: Step) {
		//step.progressDates = this.setProgressDates(step);
		this.saveStorage(this.data);
		console.log('data updated');
		// instead of refreshing whole tree, return progress dates and update the step only
		//return step.progressDates;
	}
}

/**
 * @title Tree with nested nodes
 */
@Component({
	selector: 'app-project-gant',
	templateUrl: './project-gant.component.html',
	styleUrls: ['./project-gant.component.css'],
	providers: [ChartDatabase]
})
export class ProjectGantComponent implements OnInit {
	role = localStorage.getItem('role');
	urlBack = config.urlBack;

	showGant = true;
	currentStep: Step;
	currentStepParent: StepFlatNode;
	currentDateStart: Date;
	currentDateEnd: Date;
	currentComment = '';
	currentName = '';
	errorMsg: string;
	message: string;
	public currentFile: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'currentFile'
	}); //file
	currentFileName = '';
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	moment = moment;
	dates: string[] = []; // all days in chart
	weeks: string[] = []; // all weeks in chart
	months: string[] = []; // all months in chart
	years: string[] = []; // all years in chart

	dayOFweek: Map<string, string> = new Map<string, string>();
	weekOFday: Map<string, number> = new Map<string, number>();

	dayOFmonth: Map<string, string> = new Map<string, string>();
	monthOFday: Map<string, number> = new Map<string, number>();

	today = moment().format('YYYY-MM-DD');
	created: string;

	filter = {
		name: ' - ',
		comment: false,
		file: false,
		start: false,
		end: false
	};

	editNameBool = false;
	editStartBool = false;
	editEndBool = false;
	editCommentBool = false;
	editFilesBool = false;

	/** Map from flat node to nested node. This helps us finding the nested node to be modified */
	flatNodeMap: Map<StepFlatNode, Step> = new Map<StepFlatNode, Step>();

	/** Map from nested node to flattened node. This helps us to keep the same object for selection */
	nestedNodeMap: Map<Step, StepFlatNode> = new Map<Step, StepFlatNode>();

	treeControl: FlatTreeControl<StepFlatNode>;
	treeFlattener: MatTreeFlattener<Step, StepFlatNode>;
	dataSource: MatTreeFlatDataSource<Step, StepFlatNode>;

	chartData;

	sidebarStyle = {};
	public angForm: FormGroup;

	constructor(private database: ChartDatabase, private http: HttpClient, private fb: FormBuilder) {
		let _id = window.location.search.split('&')[0].split('=')[1];
		this.http
			.get(config.urlBack + '/api/projects/project/' + _id, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setProject(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);

		this.createForm();

		this.treeFlattener = new MatTreeFlattener(
			this.transformer,
			this._getLevel,
			this._isExpandable,
			this._getChildren
		);
		this.treeControl = new FlatTreeControl<StepFlatNode>(this._getLevel, this._isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

		database.dataChange.subscribe((tree: Step) => {
			if (tree) {
				this.chartData = tree;
				this.dataSource.data = [tree];
				this.buildCalendar(tree);

				/** expand tree based on status */
				this.treeControl.dataNodes.forEach((node) => {
					if (node.expanded) {
						this.treeControl.expand(node);
					} else {
						this.treeControl.collapse(node);
					}
				});

				console.log(tree);
			}
		});
	}

	setProject(res) {
		this.project = res;
		this.created = this.moment(this.project.created).format('YYYY-MM-DD');
		this.http
			.get(config.urlBack + '/api/categories/category/' + this.project.category, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setProjectCategoryName(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	setProjectCategoryName(res) {
		this.categoryPr = res;
		if (this.project.manager)
			this.http
				.get(config.urlBack + '/api/managers/manager/' + this.project.manager, {
					headers: { 'x-access-token': localStorage.getItem('id_token') }
				})
				.subscribe(
					(res) => this.setManager(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
	}

	setManager(res) {
		this.managerPr = res;
	}

	createForm() {
		this.angForm = this.fb.group({
			name: [''],
			currentComment: [''],
			currentDateStart: [''],
			currentDateEnd: ['']
		});
	}

	/** utils of building tree */
	transformer = (node: Step, level: number) => {
		const flatNode = new StepFlatNode(
			!!node.steps.length,
			level,
			node.name,
			node.dates,
			node.comments,
			node.files,
			node.steps,
			node.expanded
		);
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	};

	private _getLevel = (node: StepFlatNode) => node.level;

	private _isExpandable = (node: StepFlatNode) => node.expandable;

	private _getChildren = (node: Step): Observable<Step[]> => of(node.steps);

	hasChild = (_: number, _nodeData: StepFlatNode) => _nodeData.expandable;
	/** end of utils of building tree */

	ngOnInit() {
		this.currentFile.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.currentFile.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('currentFile:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Финансовый отчет №1 загружен успешно ' + r.currentFile);
			this.currentFileName = r.currentFile;
		};
	}

	/** tree nodes manipulations */
	updateStepName(node: StepFlatNode, name: string) {
		const nestedNode = this.flatNodeMap.get(node);
		this.database.updateStepName(nestedNode, name);
	}

	editChildStep(node: StepFlatNode) {
		this.showGant = false;
		this.currentStep = this.flatNodeMap.get(node);
		this.currentStepParent = this.getParentStep(node);
		this.currentStep.url = config.urlBack + '/api/users/';
	}

	addChildStep(node: StepFlatNode) {
		const nestedNode = this.flatNodeMap.get(node);
		this.database.addChildStep(nestedNode);
	}

	deleteStep(node: StepFlatNode) {
		// if root, ignore
		if (this.treeControl.getLevel(node) < 1) {
			return null;
		}

		const parentFlatNode = this.getParentStep(node);
		const parentNode = this.flatNodeMap.get(parentFlatNode);
		const childNode = this.flatNodeMap.get(node);
		this.database.deleteStep(parentNode, childNode);
	}

	getParentStep(node: StepFlatNode) {
		const { treeControl } = this;
		const currentLevel = treeControl.getLevel(node);
		// if root, ignore
		if (currentLevel < 1) {
			return null;
		}
		const startIndex = treeControl.dataNodes.indexOf(node) - 1;
		// loop back to find the nearest upper node
		for (let i = startIndex; i >= 0; i--) {
			const currentNode = treeControl.dataNodes[i];
			if (treeControl.getLevel(currentNode) < currentLevel) {
				return currentNode;
			}
		}
	}

	toggleExpanded(node: StepFlatNode) {
		const nestedNode = this.flatNodeMap.get(node);
		this.database.toggleExpaned(nestedNode);
	}

	updateProgress(node: StepFlatNode, progress: number) {
		const nestedNode = this.flatNodeMap.get(node);
		const newProgressDates = this.database.updateProgress(nestedNode, progress);
		//node.progressDates = newProgressDates;
	}

	updateDateRange(node: StepFlatNode) {
		node.dates.start = this.moment(node.dates.start).format('YYYY-MM-DD'); // convert moment to string
		node.dates.end = this.moment(node.dates.end).format('YYYY-MM-DD'); // convert moment to string
		const nestedNode = this.flatNodeMap.get(node);
		/** rebuild calendar if the root is updated */
		if (node.level === 0) {
			this.buildCalendar(nestedNode);
		}
		/** update progress dates */
		const newProgressDates = this.database.updateDateRange(nestedNode);
		//node.progressDates = newProgressDates;
	}

	/** resize and validate */
	validate(event: ResizeEvent): boolean {
		const MIN_DIMENSIONS_PX = 200;
		if (event.rectangle.width && event.rectangle.width < MIN_DIMENSIONS_PX) {
			return false;
		}
		return true;
	}

	onResizeEnd(event: ResizeEvent): void {
		this.sidebarStyle = {
			width: `${event.rectangle.width}px`
		};
	}

	buildCalendar(step: Step) {
		this.dates = []; // all days in chart
		this.weeks = []; // all weeks in chart
		this.months = []; // all months in chart
		this.years = []; // all years in chart

		this.dayOFweek = new Map<string, string>();
		this.weekOFday = new Map<string, number>();

		this.dayOFmonth = new Map<string, string>();
		this.monthOFday = new Map<string, number>();

		const start = this.moment(step.dates.start);
		const end = this.moment(step.dates.end);
		const range = this.moment.range(start, end);

		const days = Array.from(range.by('days'));
		this.dates = days.map((d) => d.format('YYYY-MM-DD'));

		days.forEach((element) => {
			var index = this.weeks.indexOf(element.week().toString());
			if (index == -1) {
				this.weeks.push(element.week().toString());
				this.weekOFday.set(element.week().toString(), 1);
			} else {
				this.weekOFday.set(
					element.week().toString(),
					this.weekOFday.get(element.week().toString()).valueOf() + 1
				);
			}
			this.dayOFweek.set(element.format('YYYY-MM-DD'), element.week().toString()); //??what for

			index = this.months.indexOf(element.format('MMMM YYYY'));
			if (index == -1) {
				this.months.push(element.format('MMMM YYYY'));
				this.monthOFday.set(element.format('MMMM YYYY'), 1);
			} else {
				this.monthOFday.set(
					element.format('MMMM YYYY'),
					this.monthOFday.get(element.format('MMMM YYYY')).valueOf() + 1
				);
			}
			this.dayOFmonth.set(element.format('YYYY-MM-DD'), element.format('MMMM YYYY'));
		});
		console.log('weeks = ' + this.weeks);
	}

	saveCurrentStep() {
		var currentStart =
			this.currentDateStart != null
				? this.moment(this.currentDateStart).toDate()
				: this.moment(this.currentStep.dates.start).toDate();
		var currentEnd =
			this.currentDateEnd != null
				? this.moment(this.currentDateEnd).toDate()
				: this.moment(this.currentStep.dates.end).toDate();

		if (currentStart > currentEnd) {
			this.message = 'start is greater';
		} else if (this.currentStepParent) {
			var parentStart = this.moment(this.currentStepParent.dates.start).toDate();
			var parentEnd = this.moment(this.currentStepParent.dates.end).toDate();

			if (parentStart > currentStart || currentEnd > parentEnd) {
				this.message = 'current date isnot in parent date';
			} else {
				this.updateCurrentStep();
				this.database.updateStep(this.filter);
			}
		} else {
			this.updateCurrentStep();
			this.database.updateStep(this.filter);
		}
		//window.location.reload()
	}

	editName() {
		this.editNameBool = true;
		this.currentName = this.currentStep.name;
	}

	cancelName() {
		this.editNameBool = false;
		this.currentName = '';
	}

	editStart() {
		this.editStartBool = true;
		this.currentDateStart = this.moment(this.currentStep.dates.start).toDate();
	}

	cancelStart() {
		this.editStartBool = false;
		this.currentDateStart = null;
	}

	editEnd() {
		this.editEndBool = true;
		this.currentDateEnd = this.moment(this.currentStep.dates.end).toDate();
	}

	cancelEnd() {
		this.editEndBool = false;
		this.currentDateEnd = null;
	}

	editComment() {
		this.editCommentBool = true;
		this.currentComment = '';
	}

	cancelComment() {
		this.editCommentBool = false;
		this.currentComment = '';
	}

	editFiles() {
		this.editFilesBool = true;
		this.currentFileName = '';
	}

	cancelFiles() {
		this.editFilesBool = false;
		this.currentFileName = '';
	}

	updateCurrentStep() {
		if (this.currentName != '' || this.currentName != null) this.currentStep.name = this.currentName;
		this.filter.name = this.currentStep.name;
		this.message = '';
		if (!this.currentStep.comments) this.currentStep.comments = [];
		if (this.currentComment != '') {
			this.currentStep.comments.push(this.currentComment);
			this.filter.comment = true;
		}
		if (!this.currentStep.files) this.currentStep.files = [];
		if (this.currentFileName != '') {
			this.filter.file = true;
			const obj = new FileS();
			obj.name = this.currentFileName;
			obj.dateD = this.moment(new Date()).format('YYYY-MM-DD');
			this.currentStep.files.push(obj);
		}
		if (this.currentDateStart) {
			this.currentStep.dates.start = this.moment(this.currentDateStart).format('YYYY-MM-DD');
			this.filter.start = true;
		}
		if (this.currentDateEnd) {
			this.currentStep.dates.end = this.moment(this.currentDateEnd).format('YYYY-MM-DD');
			this.filter.end = true;
		}
		this.currentComment = '';
		this.currentDateStart = null;
		this.currentDateEnd = null;
		this.currentFileName = '';
		this.currentName = '';
	}

	showGantDiagram() {
		window.location.reload();
	}
}
