import { Component, OnInit } from '@angular/core';
import { Project, Category, Manager, ProjectRole } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';
import * as moment from 'moment';

@Component({
	selector: 'app-project-anketa',
	templateUrl: './project-anketa.component.html',
	styleUrls: ['./project-anketa.component.css']
})
export class ProjectAnketaComponent implements OnInit {
	role = localStorage.getItem('role');

	errorMsg: string;
	errorMsgDate: string;
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	public project_rolePr: ProjectRole;
	anketaComment: string;
	anketaSrok = null;
	//registration: string;
	created: string;

	anketaManagerNotify = '';

	//investor start
	dropdownSettings = {};
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

	//investor end

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
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
			web: ['', Validators.required],
			registration: ['', Validators.required],
			fioDirector: ['', Validators.required],
			project_role: ['', Validators.required],
			personalCount: ['', Validators.required],
			ProjectDescription: [''],
			ProjectAim: [''],
			ProjectInnovation: [''],
			ProjectUniqueness: [''],
			ProjectApplication: [''],
			ProjectPerspective: [''],
			companyInfo: [''],
			ProjectLeaderDescription: [''],
			participationOfParties: [''],
			Innovations: ['', Validators.required],
			totalPeriod: ['', Validators.compose([Validators.required, Validators.max(12), Validators.min(1)])],
			notes: ['', Validators.required],
			landRequested: ['', Validators.required],
			landRequestedAddress: ['', Validators.required],
			placementRequest: ['', Validators.required]
		});
	}

	onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}

	setProject(res) {
		this.project = res;
		if (this.role == 'investor') this.setEditable();
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

		if (this.project.project_role) {
			this.http
				.get(config.urlBack + '/api/project_roles/project_role/' + this.project.project_role, {
					headers: { 'x-access-token': localStorage.getItem('id_token') }
				})
				.subscribe(
					(res) => this.setProject_role(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
		}
	}

	setManager(res) {
		this.managerPr = res;
	}

	setProject_role(res) {
		this.project_rolePr = res.data;
	}

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
	}

	setEditable() {
		let bin_element = document.getElementById('bin');
		let organisation_element = document.getElementById('organisation');
		let address_element = document.getElementById('address');
		let phone_element = document.getElementById('phone');
		let email_element = document.getElementById('email');
		let web_element = document.getElementById('web');
		let registration_element = document.getElementById('registration');
		let fioDirector_element = document.getElementById('fioDirector');
		let personalCount_element = document.getElementById('personalCount');
		let ProjectDescription_element = document.getElementById('ProjectDescription');
		let ProjectAim_element = document.getElementById('ProjectAim');
		let ProjectInnovation_element = document.getElementById('ProjectInnovation');
		let ProjectUniqueness_element = document.getElementById('ProjectUniqueness');
		let ProjectApplication_element = document.getElementById('ProjectApplication');
		let ProjectPerspective_element = document.getElementById('ProjectPerspective');
		let companyInfo_element = document.getElementById('companyInfo');
		let ProjectLeaderDescription_element = document.getElementById('ProjectLeaderDescription');
		let participationOfParties_element = document.getElementById('participationOfParties');
		let Innovations_element = document.getElementById('Innovations');
		let totalPeriod_element = document.getElementById('totalPeriod');
		let notes_element = document.getElementById('notes');
		let landRequested_element = document.getElementById('landRequested');
		let landRequestedAddress_element = document.getElementById('landRequestedAddress');
		let placementRequest_element = document.getElementById('placementRequest');
		//table data
		let buildingInitiator_element = document.getElementById('buildingInitiator');
		let buildingInvested_element = document.getElementById('buildingInvested');
		let technicaInitiator_element = document.getElementById('technicaInitiator');
		let technicaInvested_element = document.getElementById('technicaInvested');
		let oborotInitiator_element = document.getElementById('oborotInitiator');
		let oborotInvested_element = document.getElementById('oborotInvested');
		let otherInitiator_element = document.getElementById('otherInitiator');
		let otherInvested_element = document.getElementById('otherInvested');
		let valovayaVyruchka_element = document.getElementById('valovayaVyruchka');
		let valovoyProduction_element = document.getElementById('valovoyProduction');
		let rashodyProduction_element = document.getElementById('rashodyProduction');
		let operationalProfit_element = document.getElementById('operationalProfit');
		let pogashenieObyazatelstv_element = document.getElementById('pogashenieObyazatelstv');
		let otherRashody_element = document.getElementById('otherRashody');
		let taxes_element = document.getElementById('taxes');
		let profit_element = document.getElementById('profit');

		if (this.project.editManager) {
			bin_element.setAttribute('disabled', '');
			organisation_element.setAttribute('disabled', '');
			address_element.setAttribute('disabled', '');
			phone_element.setAttribute('disabled', '');
			email_element.setAttribute('disabled', '');
			web_element.setAttribute('disabled', '');
			registration_element.setAttribute('disabled', '');
			fioDirector_element.setAttribute('disabled', '');
			personalCount_element.setAttribute('disabled', '');
			ProjectDescription_element.setAttribute('disabled', '');
			ProjectAim_element.setAttribute('disabled', '');
			ProjectInnovation_element.setAttribute('disabled', '');
			ProjectUniqueness_element.setAttribute('disabled', '');
			ProjectApplication_element.setAttribute('disabled', '');
			ProjectPerspective_element.setAttribute('disabled', '');
			companyInfo_element.setAttribute('disabled', '');
			ProjectLeaderDescription_element.setAttribute('disabled', '');
			participationOfParties_element.setAttribute('disabled', '');
			Innovations_element.setAttribute('disabled', '');
			totalPeriod_element.setAttribute('disabled', '');
			notes_element.setAttribute('disabled', '');
			landRequested_element.setAttribute('disabled', '');
			landRequestedAddress_element.setAttribute('disabled', '');
			placementRequest_element.setAttribute('disabled', '');
			buildingInitiator_element.setAttribute('disabled', '');
			buildingInvested_element.setAttribute('disabled', '');
			technicaInitiator_element.setAttribute('disabled', '');
			technicaInvested_element.setAttribute('disabled', '');
			oborotInitiator_element.setAttribute('disabled', '');
			oborotInvested_element.setAttribute('disabled', '');
			otherInitiator_element.setAttribute('disabled', '');
			otherInvested_element.setAttribute('disabled', '');
			valovayaVyruchka_element.setAttribute('disabled', '');
			valovoyProduction_element.setAttribute('disabled', '');
			rashodyProduction_element.setAttribute('disabled', '');
			operationalProfit_element.setAttribute('disabled', '');
			pogashenieObyazatelstv_element.setAttribute('disabled', '');
			otherRashody_element.setAttribute('disabled', '');
			taxes_element.setAttribute('disabled', '');
			profit_element.setAttribute('disabled', '');
		}
	}
	accept() {
		if (confirm('Вы уверены?')) {
			this.project.status = 'Принято';
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{ project: this.project, anketaAcceptNotify: true },
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

	send() {
		if (confirm('Вы уверены?')) {
			if (this.anketaSrok == null || this.anketaSrok == '') {
				this.errorMsgDate = 'Обязательно укажите срок';
			} else {
				if (!this.project.anketaComments) this.project.anketaComments = [];
				this.project.anketaComments.push(this.anketaComment);
				this.project.anketaSrok = moment(this.anketaSrok).format('YYYY-MM-DD');
				this.project.editManager = false;
				this.http
					.put(
						config.urlBack + '/api/projects/' + this.project._id,
						{ project: this.project, anketaSendInvestorNotify: true },
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
	}

	binService() {
		if (this.project.bin && this.project.bin.length == 12) {
			this.http.post(config.urlBack + '/api/users/bin', { bin: this.project.bin }).subscribe(
				(res) => this.objBIN(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		}
	}

	objBIN(res) {
		this.anketaManagerNotify +=
			' БИН, Наименование организации, Юридический адрес, Дата регистрации/создания в т. ч. РНН, ФИО руководителя';
		this.project.organisation = res.data.obj.name;
		this.project.address = res.data.obj.katoAddress;
		this.project.registration = res.data.obj.registerDate ? res.data.obj.registerDate.split('T')[0] : null;
		this.project.fioDirector = res.data.obj.fio;
		console.log('res.date=' + res.data.obj.registerDate);
		console.log('this.registration=' + this.project.registration);
	}

	organisatioinChanged() {
		this.anketaManagerNotify += ' Наименование организации,';
	}

	addressChanged() {
		this.anketaManagerNotify += ' Юридический адрес,';
	}

	phoneChanged() {
		this.anketaManagerNotify += ' Контактный номер,';
	}

	emailChanged() {
		this.anketaManagerNotify += ' E-mail,';
	}

	webChanged() {
		this.anketaManagerNotify += ' Web-site,';
	}

	registrationChanged() {
		this.anketaManagerNotify += ' Дата регистрации/создания в т. ч. РНН,';
	}

	fioChanged() {
		this.anketaManagerNotify += ' ФИО руководителя,';
	}

	roleChanged() {
		this.anketaManagerNotify += ' Проектный роль,';
	}

	personalCountChanged() {
		this.anketaManagerNotify += ' Количество персонала,';
	}

	descriptionChanged() {
		this.anketaManagerNotify += ' Описание проекта,';
	}

	aimChanged() {
		this.anketaManagerNotify += ' Цели,';
	}

	projectInnoChanged() {
		this.anketaManagerNotify += ' Новизна,';
	}

	uniquenessChanged() {
		this.anketaManagerNotify += ' Уникальность,';
	}

	applicationChanged() {
		this.anketaManagerNotify += ' Конкретное применение проекта,';
	}

	perspectiveChanged() {
		this.anketaManagerNotify += ' Перспективы использования и другое,';
	}

	companyInfoChanged() {
		this.anketaManagerNotify += ' Информация о компании,';
	}

	leaderChanged() {
		this.anketaManagerNotify += ' Краткое резюме руководителя проекта,';
	}

	participationOfPartiesChanged() {
		this.anketaManagerNotify += ' Участие сторон в проекте,';
	}

	innovationsChanged() {
		this.anketaManagerNotify += ' Инновации,';
	}

	total() {
		if (!this.project.itogoInitiator) this.project.itogoInitiator = '0';
		if (!this.project.itogoInvested) this.project.itogoInvested = '0';
		if (!this.project.itogoTotal) this.project.itogoTotal = '0';

		if (!this.project.buildingInitiator) this.project.buildingInitiator = '0';
		if (!this.project.buildingInvested) this.project.buildingInvested = '0';

		if (!this.project.technicaInitiator) this.project.technicaInitiator = '0';
		if (!this.project.technicaInvested) this.project.technicaInvested = '0';

		if (!this.project.oborotInitiator) this.project.oborotInitiator = '0';
		if (!this.project.oborotInvested) this.project.oborotInvested = '0';

		if (!this.project.otherInitiator) this.project.otherInitiator = '0';
		if (!this.project.otherInvested) this.project.otherInvested = '0';

		this.project.itogoInitiator =
			'' +
			(Number.parseFloat(this.project.technicaInitiator) +
				Number.parseFloat(this.project.buildingInitiator) +
				Number.parseFloat(this.project.oborotInitiator) +
				Number.parseFloat(this.project.otherInitiator));
		this.project.itogoInvested =
			'' +
			(Number.parseFloat(this.project.technicaInvested) +
				Number.parseFloat(this.project.buildingInvested) +
				Number.parseFloat(this.project.oborotInvested) +
				Number.parseFloat(this.project.otherInvested));
		this.project.itogoTotal =
			'' + (Number.parseFloat(this.project.itogoInitiator) + Number.parseFloat(this.project.itogoInvested));
	}

	remont() {
		this.anketaManagerNotify += ' Строительство/ремонт,';

		if (!this.project.buildingInitiator) this.project.buildingInitiator = '0';
		if (!this.project.buildingInvested) this.project.buildingInvested = '0';

		this.project.buildingInitiator = this.project.buildingInitiator.replace(',', '.');
		this.project.buildingInvested = this.project.buildingInvested.replace(',', '.');
		this.project.buildingTotal =
			'' + (Number.parseFloat(this.project.buildingInitiator) + Number.parseFloat(this.project.buildingInvested));
		this.total();
	}

	tehnika() {
		this.anketaManagerNotify += ' Техника, оборудование,';

		if (!this.project.technicaInitiator) this.project.technicaInitiator = '0';
		if (!this.project.technicaInvested) this.project.technicaInvested = '0';

		this.project.technicaInvested = this.project.technicaInvested.replace(',', '.');
		this.project.technicaInitiator = this.project.technicaInitiator.replace(',', '.');
		this.project.technicaTotal =
			'' + (Number.parseFloat(this.project.technicaInitiator) + Number.parseFloat(this.project.technicaInvested));
		this.total();
	}

	oborot() {
		this.anketaManagerNotify += ' Оборотные средства,';

		if (!this.project.oborotInitiator) this.project.oborotInitiator = '0';
		if (!this.project.oborotInvested) this.project.oborotInvested = '0';

		this.project.oborotInvested = this.project.oborotInvested.replace(',', '.');
		this.project.oborotInitiator = this.project.oborotInitiator.replace(',', '.');
		this.project.oborotTotal =
			'' + (Number.parseFloat(this.project.oborotInitiator) + Number.parseFloat(this.project.oborotInvested));
		this.total();
	}

	other() {
		this.anketaManagerNotify += ' Прочее,';

		if (!this.project.otherInitiator) this.project.otherInitiator = '0';
		if (!this.project.otherInvested) this.project.otherInvested = '0';

		this.project.otherInvested = this.project.otherInvested.replace(',', '.');
		this.project.otherInitiator = this.project.otherInitiator.replace(',', '.');
		this.project.otherTotal =
			'' + (Number.parseFloat(this.project.otherInitiator) + Number.parseFloat(this.project.otherInvested));
		this.total();
	}

	vyruchka() {
		this.anketaManagerNotify += ' Валовая выручка,';

		if (!this.project.valovayaVyruchka) this.project.valovayaVyruchka = '0';
		if (!this.project.valovayaVyruchkaYear) this.project.valovayaVyruchkaYear = '0';
		if (!this.project.valovayaVyruchkaPeriod) this.project.valovayaVyruchkaPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.valovayaVyruchka = this.project.valovayaVyruchka.replace(',', '.');
		this.project.valovayaVyruchkaYear = '' + Number.parseFloat(this.project.valovayaVyruchka) * 12;
		this.project.valovayaVyruchkaPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.valovayaVyruchka) * 12;
	}

	production() {
		this.anketaManagerNotify += ' Валовое производство,';

		if (!this.project.valovoyProduction) this.project.valovoyProduction = '0';
		if (!this.project.valovoyProductionYear) this.project.valovoyProductionYear = '0';
		if (!this.project.valovoyProductionPeriod) this.project.valovoyProductionPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.valovoyProduction = this.project.valovoyProduction.replace(',', '.');
		this.project.valovoyProductionYear = '' + Number.parseFloat(this.project.valovoyProduction) * 12;
		this.project.valovoyProductionPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.valovoyProduction) * 12;
	}

	rashodyProd() {
		this.anketaManagerNotify += ' Расходы производства,';

		if (!this.project.rashodyProduction) this.project.rashodyProduction = '0';
		if (!this.project.rashodyProductionYear) this.project.rashodyProductionYear = '0';
		if (!this.project.rashodyProductionPeriod) this.project.rashodyProductionPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.rashodyProduction = this.project.rashodyProduction.replace(',', '.');
		this.project.rashodyProductionYear = '' + Number.parseFloat(this.project.rashodyProduction) * 12;
		this.project.rashodyProductionPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.rashodyProduction) * 12;
	}

	operational() {
		this.anketaManagerNotify += ' Операционная прибыль,';

		if (!this.project.operationalProfit) this.project.operationalProfit = '0';
		if (!this.project.operationalProfitYear) this.project.operationalProfitYear = '0';
		if (!this.project.operationalProfitPeriod) this.project.operationalProfitPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.operationalProfit = this.project.operationalProfit.replace(',', '.');
		this.project.operationalProfitYear = '' + Number.parseFloat(this.project.operationalProfit) * 12;
		this.project.operationalProfitPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.operationalProfit) * 12;
	}

	obyazatelstv() {
		this.anketaManagerNotify += ' Погашение обязательств по проекту (ОД и %),';

		if (!this.project.pogashenieObyazatelstv) this.project.pogashenieObyazatelstv = '0';
		if (!this.project.pogashenieObyazatelstvYear) this.project.pogashenieObyazatelstvYear = '0';
		if (!this.project.pogashenieObyazatelstvPeriod) this.project.pogashenieObyazatelstvPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.pogashenieObyazatelstv = this.project.pogashenieObyazatelstv.replace(',', '.');
		this.project.pogashenieObyazatelstvYear = '' + Number.parseFloat(this.project.pogashenieObyazatelstv) * 12;
		this.project.pogashenieObyazatelstvPeriod =
			'' +
			Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.pogashenieObyazatelstv) * 12;
	}

	otherR() {
		this.anketaManagerNotify += ' Прочие расходы,';

		if (!this.project.otherRashody) this.project.otherRashody = '0';
		if (!this.project.otherRashodyYear) this.project.otherRashodyYear = '0';
		if (!this.project.otherRashodyPeriod) this.project.otherRashodyPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.otherRashody = this.project.otherRashody.replace(',', '.');
		this.project.otherRashodyYear = '' + Number.parseFloat(this.project.pogashenieObyazatelstv) * 12;
		this.project.otherRashodyPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.otherRashody) * 12;
	}

	tax() {
		this.anketaManagerNotify += ' Налогообложение,';

		if (!this.project.taxes) this.project.taxes = '0';
		if (!this.project.taxesYear) this.project.taxesYear = '0';
		if (!this.project.taxesPeriod) this.project.taxesPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.taxes = this.project.taxes.replace(',', '.');
		this.project.taxesYear = '' + Number.parseFloat(this.project.taxes) * 12;
		this.project.taxesPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.taxes) * 12;
	}

	prof() {
		this.anketaManagerNotify += ' Чистая прибыль,';

		if (!this.project.profit) this.project.profit = '0';
		if (!this.project.profitYear) this.project.profitYear = '0';
		if (!this.project.profitPeriod) this.project.profitPeriod = '0';
		if (!this.project.totalPeriod) this.project.totalPeriod = '0';

		this.project.profit = this.project.profit.replace(',', '.');
		this.project.profitYear = '' + Number.parseFloat(this.project.profit) * 12;
		this.project.profitPeriod =
			'' + Number.parseFloat(this.project.totalPeriod) * Number.parseFloat(this.project.profit) * 12;
	}

	period() {
		this.anketaManagerNotify += ' За весь период,';
		this.vyruchka();
		this.production();
		this.rashodyProd();
		this.operational();
		this.obyazatelstv();
		this.otherR();
		this.tax();
		this.prof();
	}

	notesChanged() {
		this.anketaManagerNotify += ' Примечание,';
	}

	landRequestedChanged() {
		this.anketaManagerNotify += ' земельный участок площадью,';
	}

	landRequestedAddressChanged() {
		this.anketaManagerNotify += ' адрес земельного участка,';
	}

	placementRequestChanged() {
		this.anketaManagerNotify += ' цель размещения,';
	}

	save() {
		if (confirm('Вы уверены?')) {
			this.project.editManager = true;
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{
						project: this.project,
						anketaManagerNotify: this.anketaManagerNotify
					},
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
}
