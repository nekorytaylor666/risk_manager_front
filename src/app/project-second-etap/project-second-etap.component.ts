import { Component, OnInit } from '@angular/core';
import { Project, Category, Manager } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-project-second-etap',
	templateUrl: './project-second-etap.component.html',
	styleUrls: ['./project-second-etap.component.css']
})
export class ProjectSecondEtapComponent implements OnInit {
	role: string;

	errorMsg: string;
	errorMsgDate: string;
	errorMsgDateLawyer: string;
	errorMsgDateFinancier: string;
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	anketaComment: string;
	anketaCommentLawyer: string;
	anketaCommentFinancier: string;
	registration: string;
	created: string;
	yearGrafik: number;
	codeEnteredLawyer: string;
	codeEnteredFinancier: string;
	codeEnteredLawyerBool: boolean;
	codeEnteredFinancierBool: boolean;
	anketaSrok = null;
	anketaSrokLawyer = null;
	anketaSrokFinancier = null;

	secondEtapManager = '';
	secondEtapInvestor = '';

	statuses = [
		{ id: 'Принято', name: 'Принято' },
		{ id: 'Не принято', name: 'Не принято' }
	];

	yearGrafiks = [
		//График освоения инвестиций
		{ id: 2019, name: '2019' },
		{ id: 2020, name: '2020' },
		{ id: 2021, name: '2021' },
		{ id: 2022, name: '2022' },
		{ id: 2023, name: '2023' }
	];

	periods = [
		{ id: 1, name: 1 },
		{ id: 2, name: 2 },
		{ id: 3, name: 3 },
		{ id: 4, name: 4 },
		{ id: 5, name: 5 },
		{ id: 6, name: 6 },
		{ id: 7, name: 7 },
		{ id: 8, name: 8 },
		{ id: 9, name: 9 },
		{ id: 10, name: 10 },
		{ id: 11, name: 11 }
	];
	dropdownSettings = {};

	constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

	setProject(res) {
		this.project = res;
		this.setEditable();
		this.created = moment(this.project.created).format('YYYY-MM-DD');
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
		if (this.project.manager) {
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
	}

	setManager(res) {
		this.managerPr = res;
	}

	setEditable() {
		let investSum_element = document.getElementById('investSum');
		let investSumStatus_element = document.getElementById('investSumStatus');
		let investSumSrok_element = document.getElementById('investSumSrok');
		//let yearGrafik_element = document.getElementById('yearGrafik')
		//let yearGrafikAdd_element = document.getElementById('yearGrafikAdd')
		let NPV_element = document.getElementById('NPV');
		let NPVstatus_element = document.getElementById('NPVstatus');
		let NPVsrok_element = document.getElementById('NPVsrok');
		let IRR_element = document.getElementById('IRR');
		let IRRstatus_element = document.getElementById('IRRstatus');
		let IRRsrok_element = document.getElementById('IRRsrok');
		let srokOkupaemost_element = document.getElementById('srokOkupaemost');
		let srokOkupaemostStatus_element = document.getElementById('srokOkupaemostStatus');
		let srokOkupaemostSrok_element = document.getElementById('srokOkupaemostSrok');
		let summaOneMeter_element = document.getElementById('summaOneMeter');
		let summaOneMeterStatus_element = document.getElementById('summaOneMeterStatus');
		let summaOneMeterSrok_element = document.getElementById('summaOneMeterSrok');
		let rentabelnost_element = document.getElementById('rentabelnost');
		let rentabelnostStatus_element = document.getElementById('rentabelnostStatus');
		let rentabelnostSrok_element = document.getElementById('rentabelnostSrok');
		let finansBorrowed_element = document.getElementById('finansBorrowed');
		let finansBorrowedStatus_element = document.getElementById('finansBorrowedStatus');
		let finansBorrowedSrok_element = document.getElementById('finansBorrowedSrok');
		let finansPrivate_element = document.getElementById('finansPrivate');
		let finansPrivateStatus_element = document.getElementById('finansPrivateStatus');
		let finansPrivateSrok_element = document.getElementById('finansPrivateSrok');
		let finansForeign_element = document.getElementById('finansForeign');
		let finansForeignStatus_element = document.getElementById('finansForeignStatus');
		let finansForeignSrok_element = document.getElementById('finansForeignSrok');
		let finansState_element = document.getElementById('finansState');
		let finansStateStatus_element = document.getElementById('finansStateStatus');
		let finansStateSrok_element = document.getElementById('finansStateSrok');
		let expluatacia_element = document.getElementById('expluatacia');
		let S_obwaya_element = document.getElementById('S_obwaya');
		let S_kondominium_element = document.getElementById('S_kondominium');
		let A_jilaya_plowad_element = document.getElementById('A_jilaya_plowad');
		let B_parking_plowad_element = document.getElementById('B_parking_plowad');
		let C_commerce_plowad_element = document.getElementById('C_commerce_plowad');

		if (
			this.project.status2 === 'Принято' &&
			this.project.status2Financier === 'Принято' &&
			this.project.status2Lawyer === 'Принято'
		) {
			investSum_element.setAttribute('disabled', '');
			NPV_element.setAttribute('disabled', '');
			IRR_element.setAttribute('disabled', '');
			srokOkupaemost_element.setAttribute('disabled', '');
			summaOneMeter_element.setAttribute('disabled', '');
			rentabelnost_element.setAttribute('disabled', '');
			finansBorrowed_element.setAttribute('disabled', '');
			finansPrivate_element.setAttribute('disabled', '');
			finansForeign_element.setAttribute('disabled', '');
			finansState_element.setAttribute('disabled', '');
			expluatacia_element.setAttribute('disabled', '');
			S_obwaya_element.setAttribute('disabled', '');
			S_kondominium_element.setAttribute('disabled', '');
			A_jilaya_plowad_element.setAttribute('disabled', '');
			B_parking_plowad_element.setAttribute('disabled', '');
			C_commerce_plowad_element.setAttribute('disabled', '');
			if (this.project.grafikInvest)
				for (let i = 0; i < this.project.grafikInvest.length; i++) {
					let elementSum = document.getElementById(this.project.grafikInvest[i].name + 'Summa');
					elementSum.setAttribute('disabled', '');
				}
			if (this.project.grafikStroyka)
				for (let i = 0; i < this.project.grafikStroyka.length; i++) {
					let elementNote = document.getElementById(this.project.grafikStroyka[i].name + 'Note');
					elementNote.setAttribute('disabled', '');
				}
		}

		if (this.role === 'manager') {
			investSum_element.setAttribute('disabled', '');
			NPV_element.setAttribute('disabled', '');
			IRR_element.setAttribute('disabled', '');
			srokOkupaemost_element.setAttribute('disabled', '');
			summaOneMeter_element.setAttribute('disabled', '');
			rentabelnost_element.setAttribute('disabled', '');
			finansBorrowed_element.setAttribute('disabled', '');
			finansPrivate_element.setAttribute('disabled', '');
			finansForeign_element.setAttribute('disabled', '');
			finansState_element.setAttribute('disabled', '');
			expluatacia_element.setAttribute('disabled', '');
			S_obwaya_element.setAttribute('disabled', '');
			S_kondominium_element.setAttribute('disabled', '');
			A_jilaya_plowad_element.setAttribute('disabled', '');
			B_parking_plowad_element.setAttribute('disabled', '');
			C_commerce_plowad_element.setAttribute('disabled', '');
			if (this.project.grafikInvest)
				for (let i = 0; i < this.project.grafikInvest.length; i++) {
					let elementSum = document.getElementById(this.project.grafikInvest[i].name + 'Summa');
					elementSum.setAttribute('disabled', '');
				}
			if (this.project.grafikStroyka)
				for (let i = 0; i < this.project.grafikStroyka.length; i++) {
					let elementNote = document.getElementById(this.project.grafikStroyka[i].name + 'Note');
					elementNote.setAttribute('disabled', '');
				}
		}
		if (this.role === 'investor') {
			investSumStatus_element.setAttribute('disabled', 'disabled');
			investSumSrok_element.setAttribute('disabled', '');
			NPVstatus_element.setAttribute('disabled', '');
			NPVsrok_element.setAttribute('disabled', '');
			IRRstatus_element.setAttribute('disabled', '');
			IRRsrok_element.setAttribute('disabled', '');
			srokOkupaemostStatus_element.setAttribute('disabled', '');
			srokOkupaemostSrok_element.setAttribute('disabled', '');
			summaOneMeterStatus_element.setAttribute('disabled', '');
			summaOneMeterSrok_element.setAttribute('disabled', '');
			rentabelnostStatus_element.setAttribute('disabled', '');
			rentabelnostSrok_element.setAttribute('disabled', '');
			finansBorrowedStatus_element.setAttribute('disabled', '');
			finansBorrowedSrok_element.setAttribute('disabled', '');
			finansPrivateStatus_element.setAttribute('disabled', '');
			finansPrivateSrok_element.setAttribute('disabled', '');
			finansForeignStatus_element.setAttribute('disabled', '');
			finansForeignSrok_element.setAttribute('disabled', '');
			finansStateStatus_element.setAttribute('disabled', '');
			finansStateSrok_element.setAttribute('disabled', '');
			if (this.project.grafikInvest)
				for (let i = 0; i < this.project.grafikInvest.length; i++) {
					let elementStatus = document.getElementById(this.project.grafikInvest[i].name + 'Status');
					elementStatus.setAttribute('disabled', '');
					let elementSrok = document.getElementById(this.project.grafikInvest[i].name + 'Srok');
					elementSrok.setAttribute('disabled', '');
				}
		}
		if (this.role === 'lawyer' || this.role === 'financier') {
			investSum_element.setAttribute('disabled', '');
			NPV_element.setAttribute('disabled', '');
			IRR_element.setAttribute('disabled', '');
			srokOkupaemost_element.setAttribute('disabled', '');
			summaOneMeter_element.setAttribute('disabled', '');
			rentabelnost_element.setAttribute('disabled', '');
			finansBorrowed_element.setAttribute('disabled', '');
			finansPrivate_element.setAttribute('disabled', '');
			finansForeign_element.setAttribute('disabled', '');
			finansState_element.setAttribute('disabled', '');
			expluatacia_element.setAttribute('disabled', '');
			S_obwaya_element.setAttribute('disabled', '');
			S_kondominium_element.setAttribute('disabled', '');
			A_jilaya_plowad_element.setAttribute('disabled', '');
			B_parking_plowad_element.setAttribute('disabled', '');
			C_commerce_plowad_element.setAttribute('disabled', '');
			if (this.project.grafikInvest)
				for (let i = 0; i < this.project.grafikInvest.length; i++) {
					let elementSum = document.getElementById(this.project.grafikInvest[i].name + 'Summa');
					elementSum.setAttribute('disabled', '');
				}
			if (this.project.grafikStroyka)
				for (let i = 0; i < this.project.grafikStroyka.length; i++) {
					let elementNote = document.getElementById(this.project.grafikStroyka[i].name + 'Note');
					elementNote.setAttribute('disabled', '');
				}
			investSumStatus_element.setAttribute('disabled', 'disabled');
			investSumSrok_element.setAttribute('disabled', '');
			NPVstatus_element.setAttribute('disabled', '');
			NPVsrok_element.setAttribute('disabled', '');
			IRRstatus_element.setAttribute('disabled', '');
			IRRsrok_element.setAttribute('disabled', '');
			srokOkupaemostStatus_element.setAttribute('disabled', '');
			srokOkupaemostSrok_element.setAttribute('disabled', '');
			summaOneMeterStatus_element.setAttribute('disabled', '');
			summaOneMeterSrok_element.setAttribute('disabled', '');
			rentabelnostStatus_element.setAttribute('disabled', '');
			rentabelnostSrok_element.setAttribute('disabled', '');
			finansBorrowedStatus_element.setAttribute('disabled', '');
			finansBorrowedSrok_element.setAttribute('disabled', '');
			finansPrivateStatus_element.setAttribute('disabled', '');
			finansPrivateSrok_element.setAttribute('disabled', '');
			finansForeignStatus_element.setAttribute('disabled', '');
			finansForeignSrok_element.setAttribute('disabled', '');
			finansStateStatus_element.setAttribute('disabled', '');
			finansStateSrok_element.setAttribute('disabled', '');
			if (this.project.grafikInvest) {
				for (let i = 0; i < this.project.grafikInvest.length; i++) {
					let elementStatus = document.getElementById(this.project.grafikInvest[i].name + 'Status');
					elementStatus.setAttribute('disabled', '');
					let elementSrok = document.getElementById(this.project.grafikInvest[i].name + 'Srok');
					elementSrok.setAttribute('disabled', '');
				}
			}
		}
	}

	ngOnInit() {
		this.role = localStorage.getItem('role');
		const id = window.location.search.split('&')[0].split('=')[1];
		this.http
			.get(config.urlBack + '/api/projects/project/' + id, {
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
	}

	addGrafik() {
		if (!this.project.grafikInvest) {
			this.project.grafikInvest = [];
		}
		this.project.grafikInvest.push({
			name: this.yearGrafik[0].id,
			summa: null,
			status: [{ id: 'Принято', name: 'Принято' }],
			srok: null
		});
		this.yearGrafik = null;
	}

	noteExpluataciaChanged() {
		this.secondEtapInvestor += ' Примечание строительства графика,';
	}

	expluataciaChanged() {
		this.secondEtapInvestor += ' Дата ввода в эксплуатацию,';
		let quarters = [': 1-квартал', ': 2-квартал', ': 3-квартал', ': 4-квартал'];
		let year = Number(moment(this.project.expluatacia).year());
		let month = Math.ceil((Number(moment(this.project.expluatacia).month()) + 1) / 3);
		let yearNow = Number(moment().year());
		let monthNow = Math.ceil((Number(moment().month()) + 1) / 3);
		let j = 0;
		//alert('month='+month+' now='+monthNow+' year='+year+' now='+yearNow)
		this.project.grafikStroyka = [];
		for (let i = yearNow; i < year + 1; i++) {
			if (i === year && yearNow === year) {
				j = monthNow - 1;
				while (j < month) {
					//console.log('first j='+j)
					this.project.grafikStroyka.push({
						name: i + quarters[j],
						note: null
					});
					j++;
				}
			} else if (i === year) {
				j = 0;
				while (j < month) {
					//console.log('second j='+j)
					this.project.grafikStroyka.push({
						name: i + quarters[j],
						note: null
					});
					j++;
				}
			} else if (i === yearNow) {
				j = monthNow - 1;
				while (j < 4) {
					//console.log('third j='+j)
					this.project.grafikStroyka.push({
						name: i + quarters[j],
						note: null
					});
					j++;
				}
			} else {
				j = 0;
				while (j < 4) {
					//console.log('fourth j='+j)
					this.project.grafikStroyka.push({
						name: i + quarters[j],
						note: null
					});
					j++;
				}
			}
		}
	}

	S_obwayaChanged() {
		this.secondEtapInvestor += ' S-общая,';
	}

	S_kondominiumChanged() {
		this.secondEtapInvestor += ' S-кондоминиум,';
	}

	A_jilaya_plowadChanged() {
		this.secondEtapInvestor += ' Жилая,';
	}

	B_parking_plowadChanged() {
		this.secondEtapInvestor += ' Паркинг,';
	}

	C_commerce_plowadChanged() {
		this.secondEtapInvestor += ' Коммерческая,';
	}

	plowad() {
		if (!this.project.S_obwaya) {
			this.project.S_obwaya = 0;
		}
		if (!this.project.S_kondominium) {
			this.project.S_kondominium = 0;
		}
		this.project.S_vsego = this.project.S_obwaya.valueOf() + this.project.S_kondominium.valueOf();
	}

	clearS_obwaya() {
		this.project.S_obwaya = null;
	}

	clearS_kondominium() {
		this.project.S_kondominium = null;
	}

	clearA_jilaya_plowad() {
		this.project.A_jilaya_plowad = null;
	}

	clearB_parking_plowad() {
		this.project.B_parking_plowad = null;
	}

	clearC_commerce_plowad() {
		this.project.C_commerce_plowad = null;
	}

	jilaya() {
		if (!this.project.A_jilaya_plowad) this.project.A_jilaya_plowad = 0;
		if (!this.project.B_parking_plowad) this.project.B_parking_plowad = 0;
		if (!this.project.C_commerce_plowad) this.project.C_commerce_plowad = 0;
		if (!this.project.S1_A_dolyaSPK) this.project.S1_A_dolyaSPK = 0;
		if (!this.project.S2_B_dolyaSPK) this.project.S2_B_dolyaSPK = 0;
		if (!this.project.S3_C_dolyaSPK) this.project.S3_C_dolyaSPK = 0;

		this.project.S1_A_dolyaSPK = 0.025 * this.project.A_jilaya_plowad.valueOf();
		this.project.Itogo_plowad =
			this.project.A_jilaya_plowad.valueOf() +
			this.project.B_parking_plowad.valueOf() +
			this.project.C_commerce_plowad.valueOf();
		this.project.ABC_itogo_dolyaSPK =
			this.project.S1_A_dolyaSPK.valueOf() +
			this.project.S2_B_dolyaSPK.valueOf() +
			this.project.S3_C_dolyaSPK.valueOf();

		this.project.X1_dolyaObwaya =
			(this.project.S1_A_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z1_kondominium =
			(this.project.X1_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W1_Z1_dolyaSpk = 0.025 * this.project.Z1_kondominium.valueOf();

		this.project.X2_dolyaObwaya =
			(this.project.S2_B_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z2_kondominium =
			(this.project.X2_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W2_Z2_dolyaSpk = 0.025 * this.project.Z2_kondominium.valueOf();

		this.project.X3_dolyaObwaya =
			(this.project.S3_C_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z3_kondominium =
			(this.project.X3_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W3_Z3_dolyaSpk = 0.025 * this.project.Z3_kondominium.valueOf();
	}

	parking() {
		if (!this.project.A_jilaya_plowad) this.project.A_jilaya_plowad = 0;
		if (!this.project.B_parking_plowad) this.project.B_parking_plowad = 0;
		if (!this.project.C_commerce_plowad) this.project.C_commerce_plowad = 0;
		if (!this.project.S1_A_dolyaSPK) this.project.S1_A_dolyaSPK = 0;
		if (!this.project.S2_B_dolyaSPK) this.project.S2_B_dolyaSPK = 0;
		if (!this.project.S3_C_dolyaSPK) this.project.S3_C_dolyaSPK = 0;

		this.project.S2_B_dolyaSPK = 0.025 * this.project.B_parking_plowad.valueOf();
		this.project.Itogo_plowad =
			this.project.A_jilaya_plowad.valueOf() +
			this.project.B_parking_plowad.valueOf() +
			this.project.C_commerce_plowad.valueOf();
		this.project.ABC_itogo_dolyaSPK =
			this.project.S1_A_dolyaSPK.valueOf() +
			this.project.S2_B_dolyaSPK.valueOf() +
			this.project.S3_C_dolyaSPK.valueOf();

		this.project.X2_dolyaObwaya =
			(this.project.S2_B_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z2_kondominium =
			(this.project.X2_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W2_Z2_dolyaSpk = 0.025 * this.project.Z2_kondominium.valueOf();

		this.project.X1_dolyaObwaya =
			(this.project.S1_A_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z1_kondominium =
			(this.project.X1_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W1_Z1_dolyaSpk = 0.025 * this.project.Z1_kondominium.valueOf();

		this.project.X3_dolyaObwaya =
			(this.project.S3_C_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z3_kondominium =
			(this.project.X3_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W3_Z3_dolyaSpk = 0.025 * this.project.Z3_kondominium.valueOf();
	}

	commerce() {
		if (!this.project.A_jilaya_plowad) this.project.A_jilaya_plowad = 0;
		if (!this.project.B_parking_plowad) this.project.B_parking_plowad = 0;
		if (!this.project.C_commerce_plowad) this.project.C_commerce_plowad = 0;
		if (!this.project.S1_A_dolyaSPK) this.project.S1_A_dolyaSPK = 0;
		if (!this.project.S2_B_dolyaSPK) this.project.S2_B_dolyaSPK = 0;
		if (!this.project.S3_C_dolyaSPK) this.project.S3_C_dolyaSPK = 0;

		this.project.S3_C_dolyaSPK = 0.025 * this.project.C_commerce_plowad.valueOf();
		this.project.Itogo_plowad =
			this.project.A_jilaya_plowad.valueOf() +
			this.project.B_parking_plowad.valueOf() +
			this.project.C_commerce_plowad.valueOf();
		this.project.ABC_itogo_dolyaSPK =
			this.project.S1_A_dolyaSPK.valueOf() +
			this.project.S2_B_dolyaSPK.valueOf() +
			this.project.S3_C_dolyaSPK.valueOf();

		this.project.X3_dolyaObwaya =
			(this.project.S3_C_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z3_kondominium =
			(this.project.X3_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W3_Z3_dolyaSpk = 0.025 * this.project.Z3_kondominium.valueOf();

		this.project.X1_dolyaObwaya =
			(this.project.S1_A_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z1_kondominium =
			(this.project.X1_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W1_Z1_dolyaSpk = 0.025 * this.project.Z1_kondominium.valueOf();

		this.project.X2_dolyaObwaya =
			(this.project.S2_B_dolyaSPK.valueOf() * 100) / this.project.ABC_itogo_dolyaSPK.valueOf();
		this.project.Z2_kondominium =
			(this.project.X2_dolyaObwaya.valueOf() * this.project.S_kondominium.valueOf()) / 100;
		this.project.W2_Z2_dolyaSpk = 0.025 * this.project.Z2_kondominium.valueOf();
	}

	save() {
		if (confirm('Вы уверены?')) {
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{
						project: this.project,
						secondEtapManager: this.secondEtapManager != '' ? this.secondEtapManager : null,
						secondEtapInvestor: this.secondEtapInvestor != '' ? this.secondEtapInvestor : null
					},
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
		}
	}

	accept() {
		if (confirm('Вы уверены?')) {
			this.project.status2 = 'Принято';
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{ project: this.project, anketaAcceptNotify2: true },
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
		}
	}

	send() {
		if (confirm('Вы уверены?')) {
			if (this.anketaSrok === null || this.anketaSrok === '') {
				this.errorMsgDate = 'Обязательно укажите срок';
			} else {
				if (!this.project.anketaComments2) this.project.anketaComments2 = [];
				this.project.anketaComments2.push(this.anketaComment);
				this.project.anketaSrok2 = moment(this.anketaSrok).format('YYYY-MM-DD');
				this.http
					.put(
						config.urlBack + '/api/projects/' + this.project._id,
						{ project: this.project, anketaSendInvestorNotify2: true },
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
			}
		}
	}

	acceptCodeSendLawyer() {
		if (this.codeEnteredLawyer === this.project.codeEnteredLawyer) {
			this.project.status2Lawyer = 'Принято';
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{ project: this.project },
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
		} else {
			alert('Не совпадает. Проверьте код с отправленным на почту кодом!');
		}
	}

	acceptLawyer() {
		this.codeEnteredLawyerBool = true;
		this.http
			.put(
				config.urlBack + '/api/projects/' + this.project._id,
				{ project: this.project, codeLawyer: true },
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
	}

	sendLawyer() {
		if (confirm('Вы уверены?')) {
			if (this.anketaSrokLawyer === null || this.anketaSrokLawyer === '') {
				this.errorMsgDateLawyer = 'Обязательно укажите срок';
			} else {
				if (!this.project.anketaComments2Lawyer) this.project.anketaComments2Lawyer = [];
				this.project.anketaComments2Lawyer.push(this.anketaCommentLawyer);
				this.project.anketaSrok2Lawyer = moment(this.anketaSrokLawyer).format('YYYY-MM-DD');
				this.http
					.put(
						config.urlBack + '/api/projects/' + this.project._id,
						{ project: this.project },
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
			}
		}
	}

	acceptCodeSendFinancier() {
		if (this.codeEnteredFinancier === this.project.codeEnteredFinancier) {
			this.project.status2Financier = 'Принято';
			this.http
				.put(
					config.urlBack + '/api/projects/' + this.project._id,
					{ project: this.project },
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
		} else {
			alert('Не совпадает. Проверьте код с отправленным на почту кодом!');
		}
	}

	acceptFinancier() {
		this.codeEnteredFinancierBool = true;
		this.http
			.put(
				config.urlBack + '/api/projects/' + this.project._id,
				{ project: this.project, codeFinancier: true },
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
	}

	sendFinancier() {
		if (confirm('Вы уверены?')) {
			if (this.anketaSrokFinancier === null || this.anketaSrokFinancier === '') {
				this.errorMsgDateFinancier = 'Обязательно укажите срок';
			} else {
				if (!this.project.anketaComments2Financier) this.project.anketaComments2Financier = [];
				this.project.anketaComments2Financier.push(this.anketaCommentFinancier);
				this.project.anketaSrok2Financier = moment(this.anketaSrokFinancier).format('YYYY-MM-DD');
				this.http
					.put(
						config.urlBack + '/api/projects/' + this.project._id,
						{ project: this.project },
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
			}
		}
	}

	setProject2(res) {
		this.project = res;
	}

	clearInvestSum() {
		this.project.investSum = null;
	}

	clearNPV() {
		this.project.NPV = null;
	}

	clearIRR() {
		this.project.IRR = null;
	}

	clearSummaOneMeter() {
		this.project.summaOneMeter = null;
	}

	clearRentabelnost() {
		this.project.rentabelnost = null;
	}

	clearFinansBorrowed() {
		this.project.finansBorrowed = null;
	}

	clearFinansPrivate() {
		this.project.finansPrivate = null;
	}

	clearFinansForeign() {
		this.project.finansForeign = null;
	}

	clearFinansState() {
		this.project.finansState = null;
	}

	investSumChanged() {
		this.secondEtapInvestor += ' Сумма инвестиции,';
	}

	onItemSelectInvestSum(item) {
		if (item.id === 'Принято') this.project.investSumSrok = null;
		this.secondEtapManager += ' Сумма инвестиции статус,';
	}

	investSumSrokChanged() {
		this.secondEtapManager += ' Сумма инвестиции срок,';
	}

	grafikSummaChanged(item) {
		this.secondEtapInvestor += ' График освоения сумма ' + item.name + ',';
	}

	onItemSelectGrafik(item) {
		this.secondEtapManager += ' График освоения статус,';
	}

	grafikSrokChanged(item) {
		this.secondEtapManager += ' График освоения срок ' + item.name + ',';
	}

	NPVchanged() {
		this.secondEtapInvestor += ' NPV сумма,';
	}

	onItemSelectNPV(item) {
		if (item.id === 'Принято') this.project.NPVsrok = null;
		this.secondEtapManager += ' NPV статус,';
	}

	NPVsrokChanged() {
		this.secondEtapManager += ' NPV срок,';
	}

	IRRchanged() {
		this.secondEtapInvestor += ' IRR сумма,';
	}

	onItemSelectIRR(item) {
		if (item.id === 'Принято') this.project.IRRsrok = null;
		this.secondEtapManager += ' IRR статус,';
	}

	IRRsrokChanged() {
		this.secondEtapManager += ' IRR срок,';
	}

	srokOkupaemostChanged(item) {
		this.secondEtapInvestor += ' Срок окупаемости,';
	}

	onItemSelectSrokOkupaemost(item) {
		if (item.id === 'Принято') this.project.srokOkupaemostSrok = null;
		this.secondEtapManager += ' Срок окупаемости статус,';
	}

	srokOkupaemostSrokChanged() {
		this.secondEtapManager += ' Срок окупаемости срок,';
	}

	summaOneMeterChanged() {
		this.secondEtapInvestor += ' Сумма за 1 кв. м.,';
	}

	onItemSelectSummaOneMeter(item) {
		if (item.id === 'Принято') this.project.summaOneMeterSrok = null;
		this.secondEtapManager += ' Сумма за 1 кв. м. статус,';
	}

	summaOneMeterSrokChanged() {
		this.secondEtapManager += ' Сумма за 1 кв. м. срок,';
	}

	rentabelnostChanged() {
		this.secondEtapInvestor += ' Рентабельность,';
	}

	onItemSelectRentabelnost(item) {
		if (item.id === 'Принято') this.project.rentabelnostSrok = null;
		this.secondEtapManager += ' Рентабельность статус,';
	}

	rentabelnostSrokChanged() {
		this.secondEtapManager += ' Рентабельность срок,';
	}

	finansBorrowedChanged() {
		this.secondEtapInvestor += ' Заемные,';
	}

	onItemSelectFinansBorrowed(item) {
		if (item.id === 'Принято') this.project.finansBorrowedSrok = null;
		this.secondEtapManager += ' Заемные статус,';
	}

	finansBorrowedSrokChanged() {
		this.secondEtapManager += ' Заемные срок,';
	}

	finansPrivateChanged() {
		this.secondEtapInvestor += ' Собственные,';
	}

	onItemSelectFinansPrivate(item) {
		if (item.id === 'Принято') this.project.finansPrivateSrok = null;
		this.secondEtapManager += ' Собственные статус,';
	}

	finansPrivateSrokChanged() {
		this.secondEtapManager += ' Собственные срок,';
	}

	finansForeignChanged() {
		this.secondEtapInvestor += ' Иностранные,';
	}

	onItemSelectFinansForeign(item) {
		if (item.id === 'Принято') this.project.finansForeignSrok = null;
		this.secondEtapManager += ' Иностранные статус,';
	}

	finansForeignSrokChanged() {
		this.secondEtapManager += ' Иностранные срок,';
	}

	finansStateChanged() {
		this.secondEtapInvestor += ' Государственные программы (бюджетные средства),';
	}

	onItemSelectFinansState(item) {
		if (item.id === 'Принято') this.project.finansStateSrok = null;
		this.secondEtapManager += ' Государственные программы (бюджетные средства) статус,';
	}

	finansStateSrokChanged() {
		this.secondEtapManager += ' Государственные программы (бюджетные средства) срок,';
	}
}
