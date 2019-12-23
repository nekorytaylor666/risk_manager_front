import { Component, OnInit } from '@angular/core';
import { User } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-cabinet',
	templateUrl: './cabinet.component.html',
	styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
	role = localStorage.getItem('role');

	urlBack = config.urlBack;
	errorMsg: string;
	user: User;
	public angForm: FormGroup;

	public account_validation_messages = {
		email: [
			{ type: 'required', message: 'email required' },
			{ type: 'email', message: 'email format' }
		],
		phone: [
			{ type: 'required', message: 'phone required' },
			{ type: 'pattern', message: 'phone format' }
		]
	};
	constructor(private http: HttpClient, private fb: FormBuilder) {
		this.createForm();
	}

	createForm() {
		this.angForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			phone: ['', Validators.compose([Validators.required, Validators.pattern(/8(\d){10}/)])]
		});
	}

	ngOnInit() {
		this.http
			.get(config.urlBack + '/api/users', { headers: { 'x-access-token': localStorage.getItem('id_token') } })
			.subscribe(
				(res) => this.setUser(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	setUser(res) {
		this.user = res;
	}

	save() {
		this.http
			.put(
				config.urlBack + '/api/users?id=' + this.user._id,
				{ user: this.user },
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
