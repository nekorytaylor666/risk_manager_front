import { Component, OnInit } from '@angular/core';
import { Project, Category, Manager } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as config from '../../../config';

@Component({
	selector: 'app-project-spk-docs',
	templateUrl: './project-spk-docs.component.html',
	styleUrls: ['./project-spk-docs.component.css']
})
export class ProjectSpkDocsComponent implements OnInit {
	role = localStorage.getItem('role');

	urlBack = config.urlBack;
	errorMsg: string;
	public project: Project;
	public categoryPr: Category;
	public managerPr: Manager;
	registration: string;
	created: string;

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
	}

	setProject(res) {
		this.project = res;
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
}
