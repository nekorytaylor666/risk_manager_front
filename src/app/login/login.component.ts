import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public angForm: FormGroup;
	public login: string;
	public password: string;
	public errorMsg: string;

	constructor(private loginservice: AuthenticationService, private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
	}

	ngOnInit() {
		if (this.loginservice.isLoggedIn()) {
			window.location.replace('http://' + window.location.host);
		}
	}

	createForm() {
		this.angForm = this.fb.group({
			login: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	checkLogin() {
		if (this.login && this.password) {
			this.http
				.post<User>(config.urlBack + '/api/users/login', { login: this.login, password: this.password })
				.subscribe(
					(res) => this.loginservice.setSession(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
		} else {
			this.errorMsg = 'Нужно заполнить все поля. Исправьте пожалуйста.';
			if (!this.login) {
				this.errorMsg += ' - Логин';
			}
			if (!this.password) {
				this.errorMsg += ' - Пароль';
			}
		}
	}
}
