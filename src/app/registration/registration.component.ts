import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService, User } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import * as config from '../../../config';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	public login: string;
	public password: string;
	public confirm: string;
	public email: string;
	public phone: string;
	public bin: string;
	public organisation: string;
	public address: string;
	public registration: Date;
	public fio_director: string;
	public role: string;
	public aggree: boolean;
	public errorMsg: string;
	public angForm: FormGroup;

	public account_validation_messages = {
		email: [
			{ type: 'required', message: 'email required' },
			{ type: 'email', message: 'email format' }
		],
		bin: [
			{ type: 'required', message: 'bin required' },
			{ type: 'maxlength', message: 'bin length' },
			{ type: 'minlength', message: 'bin length' }
		]
	};

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
			login: ['', Validators.required],
			password: ['', Validators.required],
			confirm: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			phone: ['', Validators.required],
			bin: ['', Validators.compose([Validators.required, Validators.maxLength(12), Validators.minLength(12)])],
			organisation: ['', Validators.required],
			address: ['', Validators.required],
			registration: ['', Validators.required],
			fio_director: ['', Validators.required],
			role: ['', Validators.required],
			aggree: ['', Validators.required]
		});
	}

	register() {
		if (!this.role) {
			this.errorMsg = 'CHECK ROLE';
		} else {
			if (this.role == 'manager' || this.role == 'lawyer' || this.role == 'financier') {
				if (this.login && this.password && this.confirm && this.email && this.phone && this.aggree) {
					if (this.password == this.confirm) {
						let user = new User(
							null,
							this.login,
							this.password,
							this.email,
							this.phone,
							this.bin,
							this.organisation,
							this.address,
							moment(this.registration).format('YYYY-MM-DD'),
							this.fio_director,
							this.aggree,
							this.role
						);

						this.http
							.post<User>(config.urlBack + '/api/users/registration', { user: user })
							.subscribe(
								(res) => this.loginservice.setSession(res),
								(error) => {
									this.errorMsg = error.error.message;
								}
							);
					} else {
						this.errorMsg = 'CONFIRM PASSWORD NOT';
					}
				} else {
					this.errorMsg = 'Нужно заполнить все поля. Исправьте пожалуйста.';
					if (!this.login) this.errorMsg += '- Логин';
					if (!this.password) this.errorMsg += '- Пароль';
					if (!this.confirm) this.errorMsg += '- Подтверждение пароля';
					if (!this.email) this.errorMsg += '- Эл. почта';
					if (!this.phone) this.errorMsg += '- Номер телефона';
					if (!this.aggree) this.errorMsg += '- Согласие';
				}
			} else if (this.role == 'investor') {
				if (
					this.login &&
					this.password &&
					this.confirm &&
					this.email &&
					this.phone &&
					this.bin &&
					this.organisation &&
					this.address &&
					this.registration &&
					this.fio_director &&
					this.aggree
				) {
					if (this.password == this.confirm) {
						let user = new User(
							null,
							this.login,
							this.password,
							this.email,
							this.phone,
							this.bin,
							this.organisation,
							this.address,
							moment(this.registration).format('YYYY-MM-DD'),
							this.fio_director,
							this.aggree,
							this.role
						);

						this.http
							.post<User>(config.urlBack + '/api/users/registration', { user: user })
							.subscribe(
								(res) => this.loginservice.setSession(res),
								(error) => {
									this.errorMsg = error.error.message;
								}
							);
					} else {
						this.errorMsg = 'CONFIRM PASSWORD NOT';
					}
				} else {
					this.errorMsg = 'Нужно заполнить все поля. Исправьте пожалуйста.';
					if (!this.login) this.errorMsg += '- Логин';
					if (!this.password) this.errorMsg += '- Пароль';
					if (!this.confirm) this.errorMsg += '- Подтверждение пароля';
					if (!this.email) this.errorMsg += '- Эл. почта';
					if (!this.phone) this.errorMsg += '- Номер телефона';
					if (!this.bin) this.errorMsg += '- БИН';
					if (!this.organisation) this.errorMsg += '- Наименование организации';
					if (!this.address) this.errorMsg += '- Юридический адрес';
					if (!this.registration) this.errorMsg += '- Дата регистрации';
					if (!this.fio_director) this.errorMsg += '- ФИО Руководителя';
					if (!this.aggree) this.errorMsg += '- Согласие';
				}
			}
		}
	}

	binService() {
		if (this.bin && this.bin.length == 12) {
			this.http.post(config.urlBack + '/api/users/bin', { bin: this.bin }).subscribe(
				(res) => this.objBIN(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
		}
	}

	objBIN(res) {
		this.organisation = res.data.obj.name;
		this.address = res.data.obj.katoAddress;
		this.registration = res.data.obj.registerDate ? res.data.obj.registerDate.split('T')[0] : null;
		this.fio_director = res.data.obj.fio;
		console.log('res.date=' + res.data.obj.registerDate);
		console.log('this.registration=' + this.registration);
	}
}
