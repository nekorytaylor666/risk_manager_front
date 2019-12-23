import { Component, OnInit } from '@angular/core';
import { ProjectRole } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as config from '../../../config';

@Component({
	selector: 'app-add-project-role',
	templateUrl: './add-project-role.component.html',
	styleUrls: ['./add-project-role.component.css']
})
export class AddProjectRoleComponent implements OnInit {
	public angForm: FormGroup;
	public name: string;
	public errorMsg: string;

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
	}

	ngOnInit() {}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	add() {
		let manager = new ProjectRole('', this.name, false);
		this.http
			.post(
				config.urlBack + '/api/project_roles',
				{ Project_Role: manager },
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
