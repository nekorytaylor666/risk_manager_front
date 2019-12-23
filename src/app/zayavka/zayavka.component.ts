import { Component, OnInit } from '@angular/core';
import { User, Manager, Category, ProjectRole, Project } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploader,  } from 'ng2-file-upload/ng2-file-upload';
import * as moment from 'moment';
import * as config from '../../../config';

const URL = config.urlBack + '/api/users/upload';

@Component({
	selector: 'app-zayavka',
	templateUrl: './zayavka.component.html',
	styleUrls: ['./zayavka.component.css']
})
export class ZayavkaComponent implements OnInit {
	public name: string;
	public category: Category[];
	public bin: string;
	public organisation: string;
	public address: string;
	public phone: string;
	public email: string;
	public web: string;
	public registration: string;
	public fioDirector: string;
	public project_role: ProjectRole;
	public personalCount: number;

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

	public ProjectDescription: string;
	public ProjectAim: string;
	public ProjectInnovation: string;
	public ProjectUniqueness: string;
	public ProjectApplication: string;
	public ProjectPerspective: string;
	public companyInfo: string;
	public ProjectLeaderDescription: string;
	public participationOfParties: string;
	public Innovations: string;
	public landSpkAstana: string;
	public landInitiator: string;
	public landInvested: string;
	public landTotal: string; //landSpkAstana + landInitiator + landInvested
	public buildingSpkAstana: string;
	public buildingInitiator: string;
	public buildingInvested: string;
	public buildingTotal: string; //buildingSpkAstana + buildingInitiator + buildingInvested
	public technicaSpkAstana: string;
	public technicaInitiator: string;
	public technicaInvested: string;
	public technicaTotal: string; //technicaSpkAstana + technicaInitiator + technicaInvested
	public oborotSpkAstana: string;
	public oborotInitiator: string;
	public oborotInvested: string;
	public oborotTotal: string; //oborotSpkAstana + oborotInitiator + oborotInvested
	public otherSpkAstana: string;
	public otherInitiator: string;
	public otherInvested: string;
	public otherTotal: string; //otherSpkAstana + otherInitiator + otherInvested
	public itogoSpkAstana: string;
	public itogoInitiator: string;
	public itogoInvested: string;
	public itogoTotal: string; //itogoSpkAstana + itogoInitiator + itogoInvested
	public dolyaSpkAstana: string;
	public dolyaInitiator: string;
	public dolyaInvested: string;
	public dolyaTotal: string; //dolyaSpkAstana + dolyaInitiator + dolyaInvested
	public valovayaVyruchka: string; //tenge
	public valovoyProduction: string; //edinica
	public rashodyProduction: string; //tenge
	public operationalProfit: string;
	public pogashenieObyazatelstv: string;
	public otherRashody: string;
	public taxes: string;
	public profit: string;
	public totalPeriod: string; //years
	public notes: string;
	public landRequested: Number; //га
	public landRequestedAddress: string;
	public placementRequest: string;

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

	public aggree: boolean;
	public manager: Manager;
	public investor: User;
	public categories: Category[];

	public valovayaVyruchkaYear: string; //tenge
	public valovoyProductionYear: string; //edinica
	public rashodyProductionYear: string; //tenge
	public operationalProfitYear: string;
	public pogashenieObyazatelstvYear: string;
	public otherRashodyYear: string;
	public taxesYear: string;
	public profitYear: string;
	public valovayaVyruchkaPeriod: string; //tenge
	public valovoyProductionPeriod: string; //edinica
	public rashodyProductionPeriod: string; //tenge
	public operationalProfitPeriod: string;
	public pogashenieObyazatelstvPeriod: string;
	public otherRashodyPeriod: string;
	public taxesPeriod: string;
	public profitPeriod: string;

	public errorMsg: string;
	public angForm: FormGroup;

	public account_validation_messages = {
		email: [
			{ type: 'required', message: 'email required' },
			{ type: 'email', message: 'email format' }
		],
		bin: [
			{ type: 'required', message: 'bin required' },
			{ type: 'maxlength', message: 'bin length' },
			{ type: 'minlength', message: 'bin length' }
		],
		totalPeriod: [
			{ type: 'required', message: 'totalPeriod required' },
			{ type: 'max', message: 'max period' },
			{ type: 'min', message: 'min period' }
		]
	};

	public pr_roles: ProjectRole[];
	public userID: string;
	selectedItems = [];
	dropdownSettings = {};
	dropdownSettings2 = {};

	ngOnInit() {
		this.categories = [];
		this.getCategories();
		this.dropdownSettings = {
			singleSelection: true,
			idField: '_id',
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
		this.landSpkAstana = '100';
		this.landInitiator = '0';
		this.landInvested = '0';
		this.landTotal = '100';
		this.buildingSpkAstana = '0';
		this.technicaSpkAstana = '0';
		this.oborotSpkAstana = '0';
		this.otherSpkAstana = '0';
		this.itogoSpkAstana = '0';
		//    this.dolyaSpkAstana = '9 % / 2.5 %'
		this.dolyaInitiator = '0 %';
		this.dolyaInvested = '0 %';
		//  this.dolyaTotal = '91 % / 97.5 %'
	}
	onItemSelectCategory(item: any) {
		console.log(item);
		if (item.name == 'Housing') {
			this.dolyaSpkAstana = '2.5 %';
			this.dolyaTotal = '97.5 %';
		} else {
			this.dolyaSpkAstana = '9 %';
			this.dolyaTotal = '91 %';
		}
	}
	onSelectAll(items: any) {
		console.log(items);
	}

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
		this.getProjectRoles();
	}

	setCategories(res) {
		this.categories = res.data;
	}

	getCategories() {
		this.http
			.get(config.urlBack + '/api/categories', {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setCategories(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required],
			category: ['', Validators.required],
			bin: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(12)])],
			organisation: ['', Validators.required],
			address: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			//web: ['', Validators.required ],
			registration: ['', Validators.required],
			fioDirector: ['', Validators.required],
			project_role: ['', Validators.required],
			personalCount: ['', Validators.required],
			financialReport1: [''],
			financialReport2: [''],
			financialReport3: [''],
			descriptionNote1: [''],
			descriptionNote2: [''],
			descriptionNote3: [''],
			garantyLetter: [''],
			ProjectDescription: ['', Validators.required],
			ProjectAim: [''],
			ProjectInnovation: [''],
			ProjectUniqueness: ['', Validators.required],
			ProjectApplication: [''],
			ProjectPerspective: [''],
			companyInfo: ['', Validators.required],
			ProjectLeaderDescription: [''],
			participationOfParties: [''],
			Innovations: ['', Validators.required],
			landSpkAstana: ['', Validators.required],
			landInitiator: ['', Validators.required],
			landInvested: ['', Validators.required],
			landTotal: ['', Validators.required],
			buildingSpkAstana: ['', Validators.required],
			buildingInitiator: ['', Validators.required],
			buildingInvested: ['', Validators.required],
			buildingTotal: ['', Validators.required],
			technicaSpkAstana: ['', Validators.required],
			technicaInitiator: ['', Validators.required],
			technicaInvested: ['', Validators.required],
			technicaTotal: ['', Validators.required],
			oborotSpkAstana: ['', Validators.required],
			oborotInitiator: ['', Validators.required],
			oborotInvested: ['', Validators.required],
			oborotTotal: ['', Validators.required],
			otherSpkAstana: ['', Validators.required],
			otherInitiator: ['', Validators.required],
			otherInvested: ['', Validators.required],
			otherTotal: ['', Validators.required],
			itogoSpkAstana: ['', Validators.required],
			itogoInitiator: ['', Validators.required],
			itogoInvested: ['', Validators.required],
			itogoTotal: ['', Validators.required],
			dolyaSpkAstana: ['', Validators.required],
			dolyaInitiator: ['', Validators.required],
			dolyaInvested: ['', Validators.required],
			dolyaTotal: ['', Validators.required],
			valovayaVyruchka: ['', Validators.required],
			valovoyProduction: ['', Validators.required],
			rashodyProduction: ['', Validators.required],
			operationalProfit: ['', Validators.required],
			pogashenieObyazatelstv: ['', Validators.required],
			otherRashody: ['', Validators.required],
			taxes: ['', Validators.required],
			profit: ['', Validators.required],
			totalPeriod: ['', Validators.compose([Validators.required, Validators.max(12), Validators.min(1)])],
			notes: ['', Validators.required],
			landRequested: ['', Validators.required],
			landRequestedAddress: ['', Validators.required],
			placementRequest: ['', Validators.required],
			landSchema: [''],
			projectConcept: [''],
			foreskiz: [''],
			manager: ['', Validators.required],
			investor: ['', Validators.required],
			aggree: ['', Validators.required]
		});
	}

	register() {
		console.log('project role=' + this.project_role[0]._id);
		console.log('category =' + this.category[0]._id);
		if (
			this.name &&
			this.category &&
			this.bin &&
			this.organisation &&
			this.address &&
			this.phone &&
			this.email &&
			//&& this.web
			this.registration &&
			this.fioDirector &&
			this.project_role &&
			this.personalCount &&
			/*      && this.fin1
      && this.fin2
      && this.fin3
      && this.desc1
      && this.desc2
      && this.desc3
      && this.garanty */
			this.ProjectDescription &&
			/*&& this.ProjectAim
      && this.ProjectInnovation */
			this.ProjectUniqueness &&
			/*&& this.ProjectApplication
      && this.ProjectPerspective */
			this.companyInfo &&
			/*&& this.ProjectLeaderDescription
      && this.participationOfParties */
			this.Innovations &&
			this.landSpkAstana &&
			this.landInitiator &&
			this.landInvested &&
			this.landTotal &&
			this.buildingSpkAstana &&
			this.buildingInitiator &&
			this.buildingInvested &&
			this.buildingTotal &&
			this.technicaSpkAstana &&
			this.technicaInitiator &&
			this.technicaInvested &&
			this.technicaTotal &&
			this.oborotSpkAstana &&
			this.oborotInitiator &&
			this.oborotInvested &&
			this.oborotTotal &&
			this.otherSpkAstana &&
			this.otherInitiator &&
			this.otherInvested &&
			this.otherTotal &&
			this.itogoSpkAstana &&
			this.itogoInitiator &&
			this.itogoInvested &&
			this.itogoTotal &&
			this.dolyaSpkAstana &&
			this.dolyaInitiator &&
			this.dolyaInvested &&
			this.dolyaTotal &&
			this.valovayaVyruchka &&
			this.valovoyProduction &&
			this.rashodyProduction &&
			this.operationalProfit &&
			this.pogashenieObyazatelstv &&
			this.otherRashody &&
			this.taxes &&
			this.profit &&
			this.totalPeriod &&
			this.notes &&
			this.aggree &&
			this.landRequested &&
			this.landRequestedAddress &&
			this.placementRequest
			/*      && this.landSchemaFile
      && this.projectConceptFile
      && this.foreskizFile */
		) {
			/*var ids = []
        for(let i=0; i<this.category.length; i++){
          ids.push(this.category[i]._id)
        }*/

			this.http
				.get(config.urlBack + '/api/users', {
					headers: { 'x-access-token': localStorage.getItem('id_token') }
				})
				.subscribe(
					(res) => this.setUserID(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);

			let project = new Project(
				'',
				this.name,
				this.category[0]._id,
				null,
				this.bin,
				this.organisation,
				this.address,
				this.phone,
				this.email,
				this.web,
				this.registration,
				this.fioDirector,
				this.project_role[0]._id,
				this.personalCount,
				this.fin1,
				this.fin2,
				this.fin3,
				this.desc1,
				this.desc2,
				this.desc3,
				this.garanty,
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				this.ProjectDescription,
				this.ProjectAim,
				this.ProjectInnovation,
				this.ProjectUniqueness,
				this.ProjectApplication,
				this.ProjectPerspective,
				this.companyInfo,
				this.ProjectLeaderDescription,
				this.participationOfParties,
				this.Innovations,
				this.landSpkAstana,
				this.landInitiator,
				this.landInvested,
				this.landTotal,
				this.buildingSpkAstana,
				this.buildingInitiator,
				this.buildingInvested,
				this.buildingTotal,
				this.technicaSpkAstana,
				this.technicaInitiator,
				this.technicaInvested,
				this.technicaTotal,
				this.oborotSpkAstana,
				this.oborotInitiator,
				this.oborotInvested,
				this.oborotTotal,
				this.otherSpkAstana,
				this.otherInitiator,
				this.otherInvested,
				this.otherTotal,
				this.itogoSpkAstana,
				this.landInitiator,
				this.itogoInvested,
				this.itogoTotal,
				null,
				this.dolyaSpkAstana,
				this.dolyaInitiator,
				this.dolyaInvested,
				this.dolyaTotal,
				this.valovayaVyruchka,
				this.valovoyProduction,
				this.rashodyProduction,
				this.operationalProfit,
				this.pogashenieObyazatelstv,
				this.otherRashody,
				this.taxes,
				this.profit,
				this.totalPeriod,
				this.valovayaVyruchkaYear,
				this.valovoyProductionYear,
				this.rashodyProductionYear,
				this.operationalProfitYear,
				this.pogashenieObyazatelstvYear,
				this.otherRashodyYear,
				this.taxesYear,
				this.profitYear,
				this.valovayaVyruchkaPeriod,
				this.valovoyProductionPeriod,
				this.rashodyProductionPeriod,
				this.operationalProfitPeriod,
				this.pogashenieObyazatelstvPeriod,
				this.otherRashodyPeriod,
				this.taxesPeriod,
				this.profitPeriod,
				this.notes,
				Number(this.landRequested),
				null,
				this.landRequestedAddress,
				this.placementRequest,
				this.landSchemaFile,
				this.projectConceptFile,
				this.foreskizFile,
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				moment(new Date()).format('YYYY-MM-DD'),
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				[{ id: 'Принято', name: 'Принято' }],
				null,
				null,
				null,
				null,
				this.userID,
				null,
				null,
				1,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null
			);

			this.http
				.post(
					config.urlBack + '/api/projects',
					{ project: project },
					{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
				)
				.subscribe(
					(res) => {
						window.location.replace('http://' + window.location.host + '/main');
					},
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
		} else {
			this.errorMsg = 'Нужно заполнить все поля. Исправьте пожалуйста.';
		}
	}

	setUserID(res) {
		this.userID = res._id;
	}

	binService() {
		if (this.bin && this.bin.length == 12) {
			this.http.post(config.urlBack + '/api/users/bin', { bin: this.bin }).subscribe(
				(res) => this.objBIN(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		}
	}

	objBIN(res) {
		this.organisation = res.data.obj.name;
		this.address = res.data.obj.katoAddress;
		this.registration = res.data.obj.registerDate ? res.data.obj.registerDate.split('T')[0] : null;
		this.fioDirector = res.data.obj.fio;
		console.log('res.date=' + res.data.obj.registerDate);
		console.log('this.registration=' + this.registration);
	}

	total() {
		if (!this.itogoInitiator) this.itogoInitiator = '0';
		if (!this.itogoInvested) this.itogoInvested = '0';
		if (!this.itogoTotal) this.itogoTotal = '0';

		if (!this.buildingInitiator) this.buildingInitiator = '0';
		if (!this.buildingInvested) this.buildingInvested = '0';

		if (!this.technicaInitiator) this.technicaInitiator = '0';
		if (!this.technicaInvested) this.technicaInvested = '0';

		if (!this.oborotInitiator) this.oborotInitiator = '0';
		if (!this.oborotInvested) this.oborotInvested = '0';

		if (!this.otherInitiator) this.otherInitiator = '0';
		if (!this.otherInvested) this.otherInvested = '0';

		this.itogoInitiator =
			'' +
			(Number.parseFloat(this.technicaInitiator) +
				Number.parseFloat(this.buildingInitiator) +
				Number.parseFloat(this.oborotInitiator) +
				Number.parseFloat(this.otherInitiator));
		this.itogoInvested =
			'' +
			(Number.parseFloat(this.technicaInvested) +
				Number.parseFloat(this.buildingInvested) +
				Number.parseFloat(this.oborotInvested) +
				Number.parseFloat(this.otherInvested));
		this.itogoTotal = '' + (Number.parseFloat(this.itogoInitiator) + Number.parseFloat(this.itogoInvested));
	}

	remont() {
		if (!this.buildingInitiator) this.buildingInitiator = '0';
		if (!this.buildingInvested) this.buildingInvested = '0';

		//this.buildingInitiator = this.buildingInitiator.replace(',','.')
		//this.buildingInvested = this.buildingInvested.replace(',','.')
		this.buildingTotal =
			'' + (Number.parseFloat(this.buildingInitiator) + Number.parseFloat(this.buildingInvested));
		this.total();
	}

	tehnika() {
		if (!this.technicaInitiator) this.technicaInitiator = '0';
		if (!this.technicaInvested) this.technicaInvested = '0';

		//this.technicaInvested = this.technicaInvested.replace(',','.')
		//this.technicaInitiator = this.technicaInitiator.replace(',','.')
		this.technicaTotal =
			'' + (Number.parseFloat(this.technicaInitiator) + Number.parseFloat(this.technicaInvested));
		this.total();
	}

	oborot() {
		if (!this.oborotInitiator) this.oborotInitiator = '0';
		if (!this.oborotInvested) this.oborotInvested = '0';

		//this.oborotInvested = this.oborotInvested.replace(',','.')
		//this.oborotInitiator = this.oborotInitiator.replace(',','.')
		this.oborotTotal = '' + (Number.parseFloat(this.oborotInitiator) + Number.parseFloat(this.oborotInvested));
		this.total();
	}

	other() {
		if (!this.otherInitiator) this.otherInitiator = '0';
		if (!this.otherInvested) this.otherInvested = '0';

		//this.otherInvested = this.otherInvested.replace(',','.')
		//this.otherInitiator = this.otherInitiator.replace(',','.')
		this.otherTotal = '' + (Number.parseFloat(this.otherInitiator) + Number.parseFloat(this.otherInvested));
		this.total();
	}

	vyruchka() {
		if (!this.valovayaVyruchka) this.valovayaVyruchka = '0';
		if (!this.valovayaVyruchkaYear) this.valovayaVyruchkaYear = '0';
		if (!this.valovayaVyruchkaPeriod) this.valovayaVyruchkaPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.valovayaVyruchka = this.valovayaVyruchka.replace(',','.')
		this.valovayaVyruchkaYear = '' + Number.parseFloat(this.valovayaVyruchka) * 12;
		this.valovayaVyruchkaPeriod =
			'' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.valovayaVyruchka) * 12;
	}

	production() {
		if (!this.valovoyProduction) this.valovoyProduction = '0';
		if (!this.valovoyProductionYear) this.valovoyProductionYear = '0';
		if (!this.valovoyProductionPeriod) this.valovoyProductionPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.valovoyProduction = this.valovoyProduction.replace(',','.')
		this.valovoyProductionYear = '' + Number.parseFloat(this.valovoyProduction) * 12;
		this.valovoyProductionPeriod =
			'' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.valovoyProduction) * 12;
	}

	rashodyProd() {
		if (!this.rashodyProduction) this.rashodyProduction = '0';
		if (!this.rashodyProductionYear) this.rashodyProductionYear = '0';
		if (!this.rashodyProductionPeriod) this.rashodyProductionPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.rashodyProduction = this.rashodyProduction.replace(',','.')
		this.rashodyProductionYear = '' + Number.parseFloat(this.rashodyProduction) * 12;
		this.rashodyProductionPeriod =
			'' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.rashodyProduction) * 12;
	}

	operational() {
		if (!this.operationalProfit) this.operationalProfit = '0';
		if (!this.operationalProfitYear) this.operationalProfitYear = '0';
		if (!this.operationalProfitPeriod) this.operationalProfitPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.operationalProfit = this.operationalProfit.replace(',','.')
		this.operationalProfitYear = '' + Number.parseFloat(this.operationalProfit) * 12;
		this.operationalProfitPeriod =
			'' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.operationalProfit) * 12;
	}

	obyazatelstv() {
		if (!this.pogashenieObyazatelstv) this.pogashenieObyazatelstv = '0';
		if (!this.pogashenieObyazatelstvYear) this.pogashenieObyazatelstvYear = '0';
		if (!this.pogashenieObyazatelstvPeriod) this.pogashenieObyazatelstvPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.pogashenieObyazatelstv = this.pogashenieObyazatelstv.replace(',','.')
		this.pogashenieObyazatelstvYear = '' + Number.parseFloat(this.pogashenieObyazatelstv) * 12;
		this.pogashenieObyazatelstvPeriod =
			'' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.pogashenieObyazatelstv) * 12;
	}

	otherR() {
		if (!this.otherRashody) this.otherRashody = '0';
		if (!this.otherRashodyYear) this.otherRashodyYear = '0';
		if (!this.otherRashodyPeriod) this.otherRashodyPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.otherRashody = this.otherRashody.replace(',','.')
		this.otherRashodyYear = '' + Number.parseFloat(this.pogashenieObyazatelstv) * 12;
		this.otherRashodyPeriod = '' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.otherRashody) * 12;
	}

	tax() {
		if (!this.taxes) this.taxes = '0';
		if (!this.taxesYear) this.taxesYear = '0';
		if (!this.taxesPeriod) this.taxesPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.taxes = this.taxes.replace(',','.')
		this.taxesYear = '' + Number.parseFloat(this.taxes) * 12;
		this.taxesPeriod = '' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.taxes) * 12;
	}

	prof() {
		if (!this.profit) this.profit = '0';
		if (!this.profitYear) this.profitYear = '0';
		if (!this.profitPeriod) this.profitPeriod = '0';
		if (!this.totalPeriod) this.totalPeriod = '0';

		//this.profit = this.profit.replace(',','.')
		this.profitYear = '' + Number.parseFloat(this.profit) * 12;
		this.profitPeriod = '' + Number.parseFloat(this.totalPeriod) * Number.parseFloat(this.profit) * 12;
	}

	period() {
		this.vyruchka();
		this.production();
		this.rashodyProd();
		this.operational();
		this.obyazatelstv();
		this.otherR();
		this.tax();
		this.prof();
	}

	setProjectRoles(res) {
		this.pr_roles = res.data;
		this.pr_roles.forEach((element) => {
			element.checked = false;
		});
	}

	getProjectRoles() {
		this.http
			.get(config.urlBack + '/api/project_roles', {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setProjectRoles(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	clear_buildingInitiator() {
		this.buildingInitiator = null;
	}

	clear_buildingInvested() {
		this.buildingInvested = null;
	}

	clear_technicaInitiator() {
		this.technicaInitiator = null;
	}

	clear_technicaInvested() {
		this.technicaInvested = null;
	}

	clear_oborotInitiator() {
		this.oborotInitiator = null;
	}

	clear_oborotInvested() {
		this.oborotInvested = null;
	}

	clear_otherInitiator() {
		this.otherInitiator = null;
	}

	clear_otherInvested() {
		this.otherInvested = null;
	}

	clear_valovayaVyruchka() {
		this.valovayaVyruchka = null;
	}

	clear_valovoyProduction() {
		this.valovoyProduction = null;
	}

	clear_rashodyProduction() {
		this.rashodyProduction = null;
	}

	clear_operationalProfit() {
		this.operationalProfit = null;
	}

	clear_pogashenieObyazatelstv() {
		this.pogashenieObyazatelstv = null;
	}

	clear_otherRashody() {
		this.otherRashody = null;
	}

	clear_taxes() {
		this.taxes = null;
	}

	clear_profit() {
		this.profit = null;
	}
}
