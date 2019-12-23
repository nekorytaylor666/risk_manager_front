import { Component, OnInit } from '@angular/core';
import { ProjectRole } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as config from '../../../config';

@Component({
	selector: 'app-edit-project-role',
	templateUrl: './edit-project-role.component.html',
	styleUrls: ['./edit-project-role.component.css']
})
export class EditProjectRoleComponent implements OnInit {
	public angForm: FormGroup;
	public name: string;
	public errorMsg: string;

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
		let _id = window.location.search.split('&')[0].split('=')[1];
		//this.name = window.location.search.split('&')[1].split('=')[1]
		this.http
			.get(config.urlBack + '/api/project_roles/project_role/' + _id, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setName(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	setName(res) {
		this.name = res.data.name;
	}

	ngOnInit() {}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	save() {
		let _id = window.location.search.split('&')[0].split('=')[1];
		let category = new ProjectRole(_id, this.name, false);
		this.http
			.put(
				config.urlBack + '/api/project_roles',
				{ Project_Role: category },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					window.location.replace('http://' + window.location.host + '/project-role');
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}
}
