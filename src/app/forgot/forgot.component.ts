import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';

@Component({
	selector: 'app-forgot',
	templateUrl: './forgot.component.html',
	styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
	public angForm: FormGroup;
	public login: string;
	public email: string;
	public password: string;
	public confirm: string;
	public errorMsg: string;
	public successMsg: string;

	constructor(private loginservice: AuthenticationService, private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
	}

	ngOnInit() {
		if (this.loginservice.isLoggedIn()) {
			window.location.replace('http://' + window.location.host + '/main');
		}
	}

	createForm() {
		this.angForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			login: ['', Validators.required],
			password: ['', Validators.required],
			confirm: ['', Validators.required]
		});
	}

	checkLogin() {
		if (this.password == this.confirm) {
			this.http
				.post(config.urlBack + '/api/users/forgot', {
					email: this.email,
					login: this.login,
					password: this.password
				})
				.subscribe(
					(res) => this.successMsges(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
		} else {
			this.errorMsg = 'Пароль не совпадает с повторным вводом. Исправьте пожалуйста.';
		}
	}

	successMsges(res) {
		this.successMsg = res.data.message;
	}
}
