import { Component, OnInit } from '@angular/core';
import { Project, Manager } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';

@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
	projects: Project[];
	managers: Manager[];
	lawyers: Manager[];
	financiers: Manager[];
	errorMsg: string;
	public selectedManagers: Manager[];
	public selectedLawyers: Manager[];
	public selectedFinanciers: Manager[];

	mapProjectsMans = new Map();
	mapProjectsLaws = new Map();
	mapProjectsFins = new Map();
	dropdownList = [];
	selectedItems = [];
	selectedItemsLaws = [];
	selectedItemsFins = [];
	dropdownSettings = {};
	ngOnInit() {
		this.http
			.get(config.urlBack + '/api/projects', { headers: { 'x-access-token': localStorage.getItem('id_token') } })
			.subscribe(
				(res) => this.setProjects(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		this.dropdownSettings = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Выбрать все',
			unSelectAllText: 'Снять все',
			itemsShowLimit: 3,
			allowSearchFilter: false
		};
	}

	onItemSelect(item: any) {
		console.log(item);
	}

	onSelectAll(items: any) {
		console.log(items);
	}

	constructor(private http: HttpClient) {}

	setProjects(res) {
		this.projects = res.data;
		this.getManagers();
		this.selectedManagers = [];
	}

	setManagers(res) {
		this.managers = res.data;
		this.getLawyers();
		this.managers.forEach((element) => {
			element.checked = false;
			if (element.projects)
				for (let i = 0; i < element.projects.length; i++) {
					let obj = this.searchProjects(element.projects[i]);
					element.projects[i] = obj;
					this.mapProjectsMans.set(obj._id, element._id);
					this.selectedItems.push(obj._id);
					console.log('id=' + obj._id);
					console.log('name=' + obj.name);
				}
		});
	}

	setLawyers(res) {
		this.lawyers = res.data;
		this.getFinanciers();
		this.lawyers.forEach((element) => {
			element.checked = false;
			if (element.projects)
				for (let i = 0; i < element.projects.length; i++) {
					let obj = this.searchProjects(element.projects[i]);
					element.projects[i] = obj;
					this.mapProjectsLaws.set(obj._id, element._id);
					this.selectedItemsLaws.push(obj._id);
					console.log('id=' + obj._id);
					console.log('name=' + obj.name);
				}
		});
	}

	setFinanciers(res) {
		this.financiers = res.data;
		this.financiers.forEach((element) => {
			element.checked = false;
			if (element.projects)
				for (let i = 0; i < element.projects.length; i++) {
					let obj = this.searchProjects(element.projects[i]);
					element.projects[i] = obj;
					this.mapProjectsFins.set(obj._id, element._id);
					this.selectedItemsFins.push(obj._id);
					console.log('id=' + obj._id);
					console.log('name=' + obj.name);
				}
		});
	}

	searchProjects(val) {
		for (let i = 0; i < this.projects.length; i++) {
			if (this.projects[i]._id == val) {
				console.log('id=' + this.projects[i]._id);
				return this.projects[i];
			}
		}
	}

	getFinanciers() {
		this.http
			.get(config.urlBack + '/api/financiers', {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setFinanciers(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	getLawyers() {
		this.http
			.get(config.urlBack + '/api/lawyers', { headers: { 'x-access-token': localStorage.getItem('id_token') } })
			.subscribe(
				(res) => this.setLawyers(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	getManagers() {
		this.http
			.get(config.urlBack + '/api/managers', { headers: { 'x-access-token': localStorage.getItem('id_token') } })
			.subscribe(
				(res) => this.setManagers(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	check(item) {
		if (!item.checked) {
			this.selectedManagers.push(item);
		} else {
			let index = this.selectedManagers.indexOf(item);
			this.selectedManagers.splice(index, 1);
		}
	}

	checkLawyer(item) {
		if (!item.checked) {
			this.selectedLawyers.push(item);
		} else {
			let index = this.selectedLawyers.indexOf(item);
			this.selectedLawyers.splice(index, 1);
		}
	}

	checkFinancier(item) {
		if (!item.checked) {
			this.selectedFinanciers.push(item);
		} else {
			let index = this.selectedFinanciers.indexOf(item);
			this.selectedFinanciers.splice(index, 1);
		}
	}

	delete() {
		var listID = [];
		for (let i = 0; i < this.selectedManagers.length; i++) {
			listID.push(this.selectedManagers[i]._id);
		}
		this.http
			.post(
				config.urlBack + '/api/managers/delete',
				{ managers: listID },
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

	save() {
		this.http
			.post(
				config.urlBack + '/api/managers/update',
				{ managers: this.managers },
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

	deleteLawyer() {
		var listID = [];
		for (let i = 0; i < this.selectedLawyers.length; i++) {
			listID.push(this.selectedLawyers[i]._id);
		}
		this.http
			.post(
				config.urlBack + '/api/lawyers/delete',
				{ lawyers: listID },
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

	saveLawyer() {
		this.http
			.post(
				config.urlBack + '/api/lawyers/update',
				{ lawyers: this.lawyers },
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

	deleteFinancier() {
		var listID = [];
		for (let i = 0; i < this.selectedFinanciers.length; i++) {
			listID.push(this.selectedFinanciers[i]._id);
		}
		this.http
			.post(
				config.urlBack + '/api/financiers/delete',
				{ financiers: listID },
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

	saveFinancier() {
		this.http
			.post(
				config.urlBack + '/api/financiers/update',
				{ financiers: this.financiers },
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

	manageProjects() {
		let j = 0;
		for (let i = 0; i < this.projects.length; i++) {
			if (this.projects[i].manager == null) {
				console.log('man projects=' + this.managers[j].projects + ' j=' + j);
				if (this.managers[j].projects == null) this.managers[j].projects = [];
				this.managers[j].projects.push(this.projects[i]);
				j++;
				if (j == this.managers.length) j = 0;
			}
			if (i == this.projects.length - 1) {
				this.http
					.post(
						config.urlBack + '/api/managers/update',
						{ managers: this.managers },
						{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
					)
					.subscribe(
						(res) => {
							window.location.replace(window.location.href);
						},
						(error) => {
							this.errorMsg = error.error.message;
						}
					);
			}
		}
	}
}
