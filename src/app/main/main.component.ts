import { Component, OnInit } from '@angular/core';
import { Category, Project } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ExcelServicesService } from '../service/excel-services.service';
//import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as config from '../../../config';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	role = localStorage.getItem('role');

	/*  titleC = 'По категориям';
  type = 'PieChart';
  data = [
    ['Transport', 0.0],
    ['Development', 0.0],
    ['Sport', 0.0],
    ['Gaming', 0.0],
    ['Other',0.0]
  ]
  data = []
  columnNames = ['Категория', 'Процент'];
  width = 550;
  height = 400;*/

	/*  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      //['Категория', 'Процент'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //opt_firstRowIsData: true,
    options: {'title': 'По категориям'},
  };*/

	categories: Category[];
	projects: Project[];
	errorMsg: string;

	etap: number;
	city: string;
	region: string;
	price: number;
	zayavkaStart: Date;
	zayavkaEnd: Date;
	areaStart: number;
	areaEnd: number;
	areaZastroikaStart: number;
	areaZastroikaEnd: number;
	invest: number;
	organisation: string;
	category: string[];
	finance: string; // =invest
	grafikStart: number; //График освоения инвестиций
	grafikEnd: number; //График освоения инвестиций
	period: number;
	vvodStart: Date;
	vvodEnd: Date;
	dolyaSpk: string;

	show2etap = false;
	showRealizovan = true;
	showNot1etap = false;
	grafiks = [
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
	organisations = [];
	dropdownSettings = {};
	dropdownSettings2 = {};
	dropdownSettings3 = {};
	etaps = [
		{ id: 1, name: 'Первый этап' },
		{ id: 2, name: 'Второй этап' },
		{ id: 3, name: 'Реализованные' },
		{ id: 4, name: 'Отказанные' }
	];
	cities = [
		//    {"id": 1, "name":'Алматы'},
		{ id: 2, name: 'Нур-Султан' }
	];
	regionsAlmaty = [
		{ id: 1, name: 'Алатауский район' },
		{ id: 2, name: 'Алмалинский район' },
		{ id: 3, name: 'Ауэзовский район' },
		{ id: 4, name: 'Бостандыкский район' },
		{ id: 5, name: 'Жетысуский район' },
		{ id: 6, name: 'Медеуский район' },
		{ id: 7, name: 'Наурызбайский район' },
		{ id: 8, name: 'Турксибский район' }
	];
	regionsNurSultan = [
		{ id: 1, name: 'Алматинский район' },
		{ id: 2, name: 'Байконурский район' },
		{ id: 3, name: 'Есильский район' },
		{ id: 4, name: 'Сарыаркинский район' }
	];
	regions = [];
	X = 100;
	Y = 1000;
	Z = 10000;
	prices = [
		{ id: 1, name: 'Малый (от 0 до ' + this.X + ')' },
		{ id: 2, name: 'Средний (от ' + this.X + ' до ' + this.Y + ')' },
		{ id: 3, name: 'Крупный (от ' + this.Y + ' до ' + this.Z + ')' }
	];
	finances = [
		{ id: 'Private', name: 'Собственные' },
		{ id: 'Borrowed', name: 'Заемные' },
		{ id: 'Foreign', name: 'Иностранные' },
		{ id: 'State', name: 'Государственные программы (бюджетные средства)' }
	];
	piesSpk = [
		{ id: 1, name: '2.5%' },
		{ id: 2, name: '9%' }
	];

	onItemSelectEtap(item: any) {
		if (item.id == 2) {
			this.show2etap = true;
			this.showNot1etap = true;
		} else if (item.id == 3 || item.id == 4) {
			this.showRealizovan = false;
			this.showNot1etap = true;
		} else if (item.id == 1) {
			this.show2etap = false;
			this.showRealizovan = true;
			this.showNot1etap = false;
		}
	}
	onItemSelectCity(item: any) {
		console.log(item);
		if (item.id == 1) this.regions = this.regionsAlmaty;
		else if (item.id == 2) this.regions = this.regionsNurSultan;
	}
	onSelectAllCity(items: any) {
		console.log(items);
	}

	constructor(private http: HttpClient, private excelService: ExcelServicesService) {}

	download() {
		this.excelService.exportAsExcelFile(this.projects, 'Проекты');
	}

	setCategories(res) {
		this.categories = res.data;
		this.categories.forEach((element) => {
			element.checked = false;
		});
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

	ngOnInit() {
		this.dropdownSettings = {
			singleSelection: true,
			idField: 'id',
			textField: 'name',
			selectAllText: 'Выбрать все',
			unSelectAllText: 'Снять все',
			itemsShowLimit: 3,
			allowSearchFilter: false,
			closeDropDownOnSelection: true
		};
		this.dropdownSettings2 = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Выбрать все',
			unSelectAllText: 'Снять все',
			itemsShowLimit: 3,
			allowSearchFilter: false
		};
		this.dropdownSettings3 = {
			singleSelection: true,
			idField: 'name',
			textField: 'name',
			selectAllText: 'Выбрать все',
			unSelectAllText: 'Снять все',
			itemsShowLimit: 3,
			allowSearchFilter: false
		};
		this.http
			.get(config.urlBack + '/api/projects/organisations', {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setOrganisations(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		this.getCategories();
	}

	setOrganisations(res) {
		this.organisations = res.data;
	}

	criteria: Project;
	analiz() {
		this.criteria = new Project(
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

		this.criteria.projectEtap = this.etap[0].id;
		if (this.etap[0].id == 1 || this.etap[0].id == 2) {
			if (this.category) this.criteria.criteriaCategory = this.category;
			if (this.city) this.criteria.city = this.city;
			if (this.region) this.criteria.region = this.region;
			if (this.price) {
				if (this.price == 1) {
					this.criteria.itogoTotal = '0';
					this.criteria.itogoTotalTo = '100';
				} else if (this.price == 2) {
					this.criteria.itogoTotal = '100';
					this.criteria.itogoTotalTo = '1000';
				} else if (this.price == 3) {
					this.criteria.itogoTotal = '1000';
					this.criteria.itogoTotalTo = '10000';
				}
			}
			if (this.zayavkaStart) {
				this.criteria.created = this.zayavkaStart;
				console.log('created=' + this.zayavkaStart);
			}
			if (this.zayavkaEnd) this.criteria.createdTo = this.zayavkaEnd;
			if (this.areaStart) this.criteria.landRequested = this.areaStart;
			if (this.areaEnd) this.criteria.landRequestedTo = this.areaEnd;
			if (this.organisation && this.organisation.length != 0) {
				this.criteria.organisation = this.organisation[0];
			}
			if (this.etap[0].id == 2) {
				if (this.areaZastroikaStart) this.criteria.Itogo_plowad = this.areaZastroikaStart;
				if (this.areaZastroikaEnd) this.criteria.Itogo_plowad_To = this.areaZastroikaEnd;
				if (this.invest) this.criteria.investSum = this.invest;
				if (this.finance) this.criteria.finans = this.finance;
				if (this.grafikStart) this.criteria.grafikInvestFrom = this.grafikStart[0].id;
				if (this.grafikEnd) this.criteria.grafikInvestTo = this.grafikEnd[0].id;
				if (this.period) this.criteria.srokOkupaemost = this.period;
				if (this.vvodStart) this.criteria.expluatacia = this.vvodStart;
				if (this.vvodEnd) this.criteria.expluataciaTo = this.vvodEnd;
				if (this.dolyaSpk) this.criteria.dolyaSpkAstana = this.dolyaSpk;
			}
		} else {
			if (this.category) this.criteria.criteriaCategory = this.category;
			if (this.areaZastroikaStart) this.criteria.Itogo_plowad = this.areaZastroikaStart;
			if (this.areaZastroikaEnd) this.criteria.Itogo_plowad_To = this.areaZastroikaEnd;
		}
		this.http
			.post(
				config.urlBack + '/api/projects/criteria?role=' + this.role,
				{ project: this.criteria },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					this.setProjects(res);
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	setProjects(res) {
		this.projects = res;
		console.log('after analiz =' + this.projects);
		var map = new Map();
		var j = 0;
		this.projects.forEach((element) => {
			this.categories.forEach((el) => {
				if (el._id == element.category) {
					console.log('name = ' + el.name);
					let name = el.name;
					console.log('name = ' + name);
					if (!map.get(name)) {
						map.set(name, 0);
					}
					console.log('name = ' + map.get(name) + ' =' + name);
					map.set(name, map.get(name) + 1);
					j++;
					if (j == this.projects.length) {
						//map.forEach(this.logMapElements)
						console.log(map.entries);
						//this.data.push(map.entries)
						let chart = am4core.create('chartdiv', am4charts.PieChart);
						// Create pie series
						let series = chart.series.push(new am4charts.PieSeries());
						series.dataFields.value = 'litres';
						series.dataFields.category = 'country';
						chart.data = [];
						// And, for a good measure, let's add a legend
						chart.legend = new am4charts.Legend();

						for (const [key, value] of map.entries()) {
							console.log(key, value);
							chart.data.push({ country: key, litres: value });
						}
					}
				}
			});
		});
	}

	logMapElements(value, key, map) {
		//this.data.push([key, value])
		console.log('m[' + key + '] = ' + value);
	}
}
