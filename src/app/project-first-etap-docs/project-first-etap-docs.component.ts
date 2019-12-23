import { Component, OnInit } from '@angular/core';
import { Project, Category, Manager } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as moment from 'moment';
import * as config from '../../../config';

const URL = config.urlBack + '/api/users/upload';

@Component({
	selector: 'app-project-first-etap-docs',
	templateUrl: './project-first-etap-docs.component.html',
	styleUrls: ['./project-first-etap-docs.component.css']
})
export class ProjectFirstEtapDocsComponent implements OnInit {
	role = localStorage.getItem('role');

	urlBack = config.urlBack;
	errorMsg: string;
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	registration: string;
	created: string;

	public fin1: string;
	public fin2: string;
	public fin3: string;
	public desc1: string;
	public desc2: string;
	public desc3: string;
	public garanty: string;
	public landSchemaFile: string;
	public projectConceptFile: string;
	public foreskizFile: string;

	public financialReport1: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'financialReport1'
	}); //file
	public financialReport2: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'financialReport2'
	}); //file
	public financialReport3: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'financialReport3'
	}); //file
	public descriptionNote1: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'descriptionNote1'
	}); //file
	public descriptionNote2: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'descriptionNote2'
	}); //file
	public descriptionNote3: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'descriptionNote3'
	}); //file
	public garantyLetter: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'garantyLetter'
	}); //file
	public landSchema: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'landSchema'
	}); //file
	public projectConcept: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'projectConcept'
	}); //file
	public foreskiz: FileUploader = new FileUploader({
		url: URL,
		itemAlias: 'foreskiz'
	}); //file

	statuses = [
		{ id: 'Принято', name: 'Принято' },
		{ id: 'Не принято', name: 'Не принято' }
	];
	dropdownSettings = {};
	constructor(private http: HttpClient) {}

	ngOnInit() {
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
		this.dropdownSettings = {
			singleSelection: true,
			idField: 'id',
			textField: 'name',
			selectAllText: 'Выбрать все',
			unSelectAllText: 'Снять все',
			itemsShowLimit: 3,
			allowSearchFilter: false
		};

		this.financialReport1.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.financialReport1.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('financialReport1:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Финансовый отчет №1 загружен успешно ' + r.financialReport1);
			this.fin1 = r.financialReport1;
		};
		this.financialReport2.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.financialReport2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('financialReport2:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Финансовый отчет №2 загружен успешно ' + r.financialReport2);
			this.fin2 = r.financialReport2;
		};
		this.financialReport3.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.financialReport3.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('financialReport3:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Финансовый отчет №3 загружен успешно ' + r.financialReport3);
			this.fin3 = r.financialReport3;
		};
		this.descriptionNote1.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.descriptionNote1.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('descriptionNote1:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Пояснительная записка №1 загружен успешно ' + r.descriptionNote1);
			this.desc1 = r.descriptionNote1;
		};
		this.descriptionNote2.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.descriptionNote2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('descriptionNote2:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Пояснительная записка №2 загружен успешно ' + r.descriptionNote2);
			this.desc2 = r.descriptionNote2;
		};
		this.descriptionNote3.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.descriptionNote3.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('descriptionNote3:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Пояснительная записка №3 загружен успешно ' + r.descriptionNote3);
			this.desc3 = r.descriptionNote3;
		};
		this.garantyLetter.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.garantyLetter.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('garantyLetter:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Гарантийное письмо загружен успешно ' + r.garantyLetter);
			this.garanty = r.garantyLetter;
		};
		this.landSchema.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.landSchema.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('landSchema:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Гарантийное письмо загружен успешно ' + r.landSchema);
			this.landSchemaFile = r.landSchema;
		};
		this.projectConcept.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.projectConcept.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('projectConcept:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Гарантийное письмо загружен успешно ' + r.projectConcept);
			this.projectConceptFile = r.projectConcept;
		};
		this.foreskiz.onAfterAddingFile = (file) => {
			file.withCredentials = false;
		};
		this.foreskiz.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			console.log('foreskiz:uploaded:', item, status, response);
			let r = JSON.parse(response);
			alert('Гарантийное письмо загружен успешно ' + r.foreskiz);
			this.foreskizFile = r.foreskiz;
		};
	}

	setProject(res) {
		this.project = res;
		this.setDisabled();
		this.created = moment(this.project.created).format('YYYY-MM-DD');
		//this.registration = moment(this.project.registration).format('YYYY-MM-DD')
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

	setDisabled() {
		let financialReport1_file_element = document.getElementById('financialReport1_file');
		let financialReport2_file_element = document.getElementById('financialReport2_file');
		let financialReport3_file_element = document.getElementById('financialReport3_file');
		let descriptionNote1_file_element = document.getElementById('descriptionNote1_file');
		let descriptionNote2_file_element = document.getElementById('descriptionNote2_file');
		let descriptionNote3_file_element = document.getElementById('descriptionNote3_file');
		let garantyLetter_file_element = document.getElementById('garantyLetter_file');
		let landSchema_file_element = document.getElementById('landSchema_file');
		let projectConcept_file_element = document.getElementById('projectConcept_file');
		let foreskiz_file_element = document.getElementById('foreskiz_file');

		let financialReport1_status_element = document.getElementById('financialReport1_status');
		let financialReport2_status_element = document.getElementById('financialReport2_status');
		let financialReport3_status_element = document.getElementById('financialReport3_status');
		let descriptionNote1_status_element = document.getElementById('descriptionNote1_status');
		let descriptionNote2_status_element = document.getElementById('descriptionNote2_status');
		let descriptionNote3_status_element = document.getElementById('descriptionNote3_status');
		let garantyLetter_status_element = document.getElementById('garantyLetter_status');
		let landSchema_status_element = document.getElementById('landSchema_status');
		let projectConcept_status_element = document.getElementById('projectConcept_status');
		let foreskiz_status_element = document.getElementById('foreskiz_status');

		let financialReport1_srok_element = document.getElementById('financialReport1_srok');
		let financialReport2_srok_element = document.getElementById('financialReport2_srok');
		let financialReport3_srok_element = document.getElementById('financialReport3_srok');
		let descriptionNote1_srok_element = document.getElementById('descriptionNote1_srok');
		let descriptionNote2_srok_element = document.getElementById('descriptionNote2_srok');
		let descriptionNote3_srok_element = document.getElementById('descriptionNote3_srok');
		let garantyLetter_srok_element = document.getElementById('garantyLetter_srok');
		let landSchema_srok_element = document.getElementById('landSchema_srok');
		let projectConcept_srok_element = document.getElementById('projectConcept_srok');
		let foreskiz_srok_element = document.getElementById('foreskiz_srok');

		if (this.project.financialReport1_status[0].name == 'Принято')
			financialReport1_file_element.setAttribute('hidden', '');
		if (this.project.financialReport2_status[0].name == 'Принято')
			financialReport2_file_element.setAttribute('hidden', '');
		if (this.project.financialReport3_status[0].name == 'Принято')
			financialReport3_file_element.setAttribute('hidden', '');
		if (this.project.descriptionNote1_status[0].name == 'Принято')
			descriptionNote1_file_element.setAttribute('hidden', '');
		if (this.project.descriptionNote2_status[0].name == 'Принято')
			descriptionNote2_file_element.setAttribute('hidden', '');
		if (this.project.descriptionNote3_status[0].name == 'Принято')
			descriptionNote3_file_element.setAttribute('hidden', '');
		if (this.project.garantyLetter_status[0].name == 'Принято')
			garantyLetter_file_element.setAttribute('hidden', '');
		if (this.project.landSchema_status[0].name == 'Принято') landSchema_file_element.setAttribute('hidden', '');
		if (this.project.projectConcept_status[0].name == 'Принято')
			projectConcept_file_element.setAttribute('hidden', '');
		if (this.project.foreskiz_status[0].name == 'Принято') foreskiz_file_element.setAttribute('hidden', '');

		if (this.role == 'manager') {
			financialReport1_file_element.setAttribute('disabled', '');
			financialReport2_file_element.setAttribute('disabled', '');
			financialReport3_file_element.setAttribute('disabled', '');
			descriptionNote1_file_element.setAttribute('disabled', '');
			descriptionNote2_file_element.setAttribute('disabled', '');
			descriptionNote3_file_element.setAttribute('disabled', '');
			garantyLetter_file_element.setAttribute('disabled', '');
			landSchema_file_element.setAttribute('disabled', '');
			projectConcept_file_element.setAttribute('disabled', '');
			foreskiz_file_element.setAttribute('disabled', '');

			financialReport1_file_element.setAttribute('hidden', '');
			financialReport2_file_element.setAttribute('hidden', '');
			financialReport3_file_element.setAttribute('hidden', '');
			descriptionNote1_file_element.setAttribute('hidden', '');
			descriptionNote2_file_element.setAttribute('hidden', '');
			descriptionNote3_file_element.setAttribute('hidden', '');
			garantyLetter_file_element.setAttribute('hidden', '');
			landSchema_file_element.setAttribute('hidden', '');
			projectConcept_file_element.setAttribute('hidden', '');
			foreskiz_file_element.setAttribute('hidden', '');
		} else if (this.role == 'investor') {
			financialReport1_status_element.setAttribute('disabled', '');
			financialReport2_status_element.setAttribute('disabled', '');
			financialReport3_status_element.setAttribute('disabled', '');
			descriptionNote1_status_element.setAttribute('disabled', '');
			descriptionNote2_status_element.setAttribute('disabled', '');
			descriptionNote3_status_element.setAttribute('disabled', '');
			garantyLetter_status_element.setAttribute('disabled', '');
			landSchema_status_element.setAttribute('disabled', '');
			projectConcept_status_element.setAttribute('disabled', '');
			foreskiz_status_element.setAttribute('disabled', '');

			financialReport1_srok_element.setAttribute('disabled', '');
			financialReport2_srok_element.setAttribute('disabled', '');
			financialReport3_srok_element.setAttribute('disabled', '');
			descriptionNote1_srok_element.setAttribute('disabled', '');
			descriptionNote2_srok_element.setAttribute('disabled', '');
			descriptionNote3_srok_element.setAttribute('disabled', '');
			garantyLetter_srok_element.setAttribute('disabled', '');
			landSchema_srok_element.setAttribute('disabled', '');
			projectConcept_srok_element.setAttribute('disabled', '');
			foreskiz_srok_element.setAttribute('disabled', '');
		} else if (this.role == 'lawyer' || this.role == 'financier') {
			financialReport1_file_element.setAttribute('disabled', '');
			financialReport2_file_element.setAttribute('disabled', '');
			financialReport3_file_element.setAttribute('disabled', '');
			descriptionNote1_file_element.setAttribute('disabled', '');
			descriptionNote2_file_element.setAttribute('disabled', '');
			descriptionNote3_file_element.setAttribute('disabled', '');
			garantyLetter_file_element.setAttribute('disabled', '');
			landSchema_file_element.setAttribute('disabled', '');
			projectConcept_file_element.setAttribute('disabled', '');
			foreskiz_file_element.setAttribute('disabled', '');

			financialReport1_file_element.setAttribute('hidden', '');
			financialReport2_file_element.setAttribute('hidden', '');
			financialReport3_file_element.setAttribute('hidden', '');
			descriptionNote1_file_element.setAttribute('hidden', '');
			descriptionNote2_file_element.setAttribute('hidden', '');
			descriptionNote3_file_element.setAttribute('hidden', '');
			garantyLetter_file_element.setAttribute('hidden', '');
			landSchema_file_element.setAttribute('hidden', '');
			projectConcept_file_element.setAttribute('hidden', '');
			foreskiz_file_element.setAttribute('hidden', '');
			financialReport1_status_element.setAttribute('disabled', '');
			financialReport2_status_element.setAttribute('disabled', '');
			financialReport3_status_element.setAttribute('disabled', '');
			descriptionNote1_status_element.setAttribute('disabled', '');
			descriptionNote2_status_element.setAttribute('disabled', '');
			descriptionNote3_status_element.setAttribute('disabled', '');
			garantyLetter_status_element.setAttribute('disabled', '');
			landSchema_status_element.setAttribute('disabled', '');
			projectConcept_status_element.setAttribute('disabled', '');
			foreskiz_status_element.setAttribute('disabled', '');

			financialReport1_srok_element.setAttribute('disabled', '');
			financialReport2_srok_element.setAttribute('disabled', '');
			financialReport3_srok_element.setAttribute('disabled', '');
			descriptionNote1_srok_element.setAttribute('disabled', '');
			descriptionNote2_srok_element.setAttribute('disabled', '');
			descriptionNote3_srok_element.setAttribute('disabled', '');
			garantyLetter_srok_element.setAttribute('disabled', '');
			landSchema_srok_element.setAttribute('disabled', '');
			projectConcept_srok_element.setAttribute('disabled', '');
			foreskiz_srok_element.setAttribute('disabled', '');
		}
	}

	save() {
		var docName;
		if (this.fin1) {
			docName = 'Финансовая отчетность №1';
			this.project.financialReport1 = this.fin1;
			this.project.financialReport1_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.fin2) {
			docName = 'Финансовая отчетность №2';
			this.project.financialReport2 = this.fin2;
			this.project.financialReport2_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.fin3) {
			docName = 'Финансовая отчетность №3';
			this.project.financialReport3 = this.fin3;
			this.project.financialReport3_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.desc1) {
			docName = 'Пояснительная записка №1';
			this.project.descriptionNote1 = this.desc1;
			this.project.descriptionNote1_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.desc2) {
			docName = 'Пояснительная записка №2';
			this.project.descriptionNote2 = this.desc2;
			this.project.descriptionNote2_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.desc3) {
			docName = 'Пояснительная записка №3';
			this.project.descriptionNote3 = this.desc3;
			this.project.descriptionNote3_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.garanty) {
			docName = 'Гарантийное письмо';
			this.project.garantyLetter = this.garanty;
			this.project.garantyLetter_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.landSchemaFile) {
			docName = 'Схема земельного участка';
			this.project.landSchema = this.landSchemaFile;
			this.project.landSchema_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.projectConceptFile) {
			docName = 'Концепция проекта';
			this.project.projectConcept = this.projectConceptFile;
			this.project.projectConcept_date = moment(new Date()).format('YYYY-MM-DD');
		}
		if (this.foreskizFile) {
			docName = 'Форэскиз';
			this.project.foreskiz = this.foreskizFile;
			this.project.foreskiz_date = moment(new Date()).format('YYYY-MM-DD');
		}
		this.http
			.put(
				config.urlBack + '/api/projects/' + this.project._id,
				{ project: this.project, docName: docName },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					window.location.reload();
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}
}
