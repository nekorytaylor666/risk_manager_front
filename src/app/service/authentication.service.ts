import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';

export class User {
	constructor(
		public _id: string,
		public login: string,
		public password: string,
		public email: string,
		public phone: string,
		public bin: string,
		public organisation: string,
		public address: string,
		public registration: string,
		public fio_director: string,
		public aggree: boolean,
		public role: string
	) {}
}

export class Manager {
	constructor(
		public _id: string,
		public fio: string,
		public phone: string,
		public projects: Project[],
		public checked: boolean
	) {}
}

export class Category {
	constructor(public _id: string, public name: string, public checked: boolean) {}
}

export class ProjectRole {
	constructor(public _id: string, public name: string, public checked: boolean) {}
}

export class Project {
	constructor(
		public _id: string,
		public name: string,
		public category: string, //Category,

		public criteriaCategory: string[],

		public bin: string,
		public organisation: string,
		public address: string,
		public phone: string,
		public email: string,
		public web: string,
		public registration: string,
		public fioDirector: string,
		public project_role: string, //ProjectRole,
		public personalCount: number,
		public financialReport1: string, //file
		public financialReport2: string, //file
		public financialReport3: string, //file
		public descriptionNote1: string, //file
		public descriptionNote2: string, //file
		public descriptionNote3: string, //file
		public garantyLetter: string, //file
		public financialReport1_date: string, //file
		public financialReport2_date: string, //file
		public financialReport3_date: string, //file
		public descriptionNote1_date: string, //file
		public descriptionNote2_date: string, //file
		public descriptionNote3_date: string, //file
		public garantyLetter_date: string, //file
		public financialReport1_status: Status[], //file
		public financialReport2_status: Status[], //file
		public financialReport3_status: Status[], //file
		public descriptionNote1_status: Status[], //file
		public descriptionNote2_status: Status[], //file
		public descriptionNote3_status: Status[], //file
		public garantyLetter_status: Status[], //file
		public financialReport1_srok: string, //file
		public financialReport2_srok: string, //file
		public financialReport3_srok: string, //file
		public descriptionNote1_srok: string, //file
		public descriptionNote2_srok: string, //file
		public descriptionNote3_srok: string, //file
		public garantyLetter_srok: string, //file
		public ProjectDescription: string,
		public ProjectAim: string,
		public ProjectInnovation: string,
		public ProjectUniqueness: string,
		public ProjectApplication: string,
		public ProjectPerspective: string,
		public companyInfo: string,
		public ProjectLeaderDescription: string,
		public participationOfParties: string,
		public Innovations: string,

		public landSpkAstana: string,
		public landInitiator: string,
		public landInvested: string,
		public landTotal: string, //landSpkAstana + landInitiator + landInvested
		public buildingSpkAstana: string,
		public buildingInitiator: string,
		public buildingInvested: string,
		public buildingTotal: string, //buildingSpkAstana + buildingInitiator + buildingInvested
		public technicaSpkAstana: string,
		public technicaInitiator: string,
		public technicaInvested: string,
		public technicaTotal: string, //technicaSpkAstana + technicaInitiator + technicaInvested
		public oborotSpkAstana: string,
		public oborotInitiator: string,
		public oborotInvested: string,
		public oborotTotal: string, //oborotSpkAstana + oborotInitiator + oborotInvested
		public otherSpkAstana: string,
		public otherInitiator: string,
		public otherInvested: string,
		public otherTotal: string, //otherSpkAstana + otherInitiator + otherInvested
		public itogoSpkAstana: string,
		public itogoInitiator: string,
		public itogoInvested: string,

		public itogoTotal: string, //itogoSpkAstana + itogoInitiator + itogoInvested

		//criteria
		public itogoTotalTo: string,

		public dolyaSpkAstana: string,
		public dolyaInitiator: string,
		public dolyaInvested: string,
		public dolyaTotal: string, //dolyaSpkAstana + dolyaInitiator + dolyaInvested

		public valovayaVyruchka: string, //tenge
		public valovoyProduction: string, //edinica
		public rashodyProduction: string, //tenge
		public operationalProfit: string,
		public pogashenieObyazatelstv: string,
		public otherRashody: string,
		public taxes: string,
		public profit: string,
		public totalPeriod: string, //years

		public valovayaVyruchkaYear: string, //tenge
		public valovoyProductionYear: string, //edinica
		public rashodyProductionYear: string, //tenge
		public operationalProfitYear: string,
		public pogashenieObyazatelstvYear: string,
		public otherRashodyYear: string,
		public taxesYear: string,
		public profitYear: string,
		public valovayaVyruchkaPeriod: string, //tenge
		public valovoyProductionPeriod: string, //edinica
		public rashodyProductionPeriod: string, //tenge
		public operationalProfitPeriod: string,
		public pogashenieObyazatelstvPeriod: string,
		public otherRashodyPeriod: string,
		public taxesPeriod: string,
		public profitPeriod: string,

		public notes: string,
		public landRequested: number, //га

		public landRequestedTo: number,

		public landRequestedAddress: string,
		public placementRequest: string,
		public landSchema: string, //file
		public projectConcept: string, //file
		public foreskiz: string, //file
		public landSchema_date: string, //file
		public projectConcept_date: string, //file
		public foreskiz_date: string, //file
		public landSchema_status: Status[], //file
		public projectConcept_status: Status[], //file
		public foreskiz_status: Status[], //file
		public landSchema_srok: string, //file
		public projectConcept_srok: string, //file
		public foreskiz_srok: string, //file
		public manager: string, //Manager,
		public investor: string, //User
		public created: Date,

		public createdTo: Date,

		public projectEtap: number,
		public investSum: number,
		public investSumStatus: Status[], //*
		public investSumSrok: Date, //*
		public grafikInvest: Grafik[], // {name:2019, summa:456, status: 'Не принято', srok: '30.09.2019'}

		public grafikInvestFrom: string,
		public grafikInvestTo: string,

		public NPV: string,
		public NPVstatus: Status[], //*
		public NPVsrok: string, //*
		public IRR: string,
		public IRRstatus: Status[], //*
		public IRRsrok: string, //*
		public srokOkupaemost: number,
		public srokOkupaemostStatus: Status[], //*
		public srokOkupaemostSrok: string, //*
		public summaOneMeter: number,
		public summaOneMeterStatus: Status[], //*
		public summaOneMeterSrok: string, //*
		public rentabelnost: number,
		public rentabelnostStatus: Status[], //*
		public rentabelnostSrok: string, //*
		public finans: string, //criteria = invest *
		public finansirovanie: number, //==invest
		public finansPrivate: number,
		public finansPrivateStatus: Status[], //*
		public finansPrivateSrok: string, //*
		public finansBorrowed: number,
		public finansBorrowedStatus: Status[], //*
		public finansBorrowedSrok: string, //*
		public finansForeign: number,
		public finansForeignStatus: Status[], //*
		public finansForeignSrok: string, //*
		public finansState: number,
		public finansStateStatus: Status[], //*
		public finansStateSrok: string, //*
		public expluatacia: Date,

		public expluataciaTo: Date,

		public grafikStroyka: Stroyka[], // {name:'', note:''}
		//    public grafikStroykaNote: string,
		public S_vsego: number,
		public S_obwaya: number, //S1+S2+S3
		public S_kondominium: number,
		public A_jilaya_plowad: number,
		public B_parking_plowad: number,
		public C_commerce_plowad: number,
		public Itogo_plowad: number, //A+B+C

		public Itogo_plowad_To: number,

		public S1_A_dolyaSPK: number,
		public S2_B_dolyaSPK: number,
		public S3_C_dolyaSPK: number,
		public ABC_itogo_dolyaSPK: number,
		public X1_dolyaObwaya: number,
		public X2_dolyaObwaya: number,
		public X3_dolyaObwaya: number,
		public Z1_kondominium: number,
		public Z2_kondominium: number,
		public Z3_kondominium: number,
		public W1_Z1_dolyaSpk: number,
		public W2_Z2_dolyaSpk: number,
		public W3_Z3_dolyaSpk: number,
		public W_obwaya: number, //W1+W2+W3
		public jilaya_plowad: number, //S1+W1
		public parking_plowad: number, //S2+W2
		public commerce_plowad: number, //S3+W3
		public itogo: number, //S1+S2+S3+W1+W2+W3
		// for criteria
		public city: string,
		public region: string,

		public steps: Step[], // [{name:'', dates: {start:'', end:''}, files: [{name:'', dateD: ''}], comments: []}]
		public files: FileS[],
		public comments: string[],
		public dates: {
			start: string; //Дата регистрации: @дата принятия менеджером анкеты
			end: string; //Дата окончания: @когда закончился весь второй этап
		},
		public expanded: boolean,
		public status: string,
		public status2: string,
		public status2Lawyer: string,
		public status2Financier: string,
		public anketaComments: string[],
		public anketaComments2: string[],
		public anketaComments2Lawyer: string[],
		public anketaComments2Financier: string[],
		public anketaSrok: string,
		public anketaSrok2: string,
		public anketaSrok2Lawyer: string,
		public anketaSrok2Financier: string,
		public editManager: boolean,
		public codeEnteredLawyer: string,
		public codeEnteredFinancier: string
	) {}
}

export class Status {
	id: string;
	name: string;
}
export class FileS {
	name: string;
	dateD: string;
}
export class Grafik {
	name: string;
	summa: number;
	status: Object[];
	srok: Date;
}

export class Stroyka {
	name: string;
	note: string;
}

export class Step {
	name: string;
	//progress: number;
	//progressDates: string[];
	dates: {
		start: string;
		end: string;
	};
	comments: string[];
	files: FileS[];
	steps: Step[];
	expanded: boolean; // status of expanded
	url: string;
}

/** Flat node with expandable and level information */
export class StepFlatNode {
	constructor(
		public expandable: boolean,
		public level: number,
		public name: string,
		//public progress: number,
		//public progressDates: string[],
		public dates: {
			start: string;
			end: string;
		},
		public comments: string[],
		public files: FileS[],
		public steps: Step[],
		public expanded: boolean
	) {}
}

export class Notification {
	projectID: string;
	projectName: string;
	projectOrganisation: string;
	text: string;
	role: string;
}

export class Log {
	action: string;
	newValue: string;
	oldValue: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private router: Router, private http: HttpClient) {}

	setSession(authResult) {
		const expiresAt = moment().add(authResult.data.expiresIn, 'second');

		localStorage.setItem('id_token', authResult.data.idToken);
		localStorage.setItem('role', authResult.data.role);
		localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

		window.location.replace('http://' + window.location.host);
	}

	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('expires_at');
		localStorage.removeItem('role');
		window.location.replace('http://' + window.location.host);
	}

	public isLoggedIn() {
		return moment().isBefore(this.getExpiration());
	}

	isLoggedOut() {
		return !this.isLoggedIn();
	}

	getExpiration() {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}
}
