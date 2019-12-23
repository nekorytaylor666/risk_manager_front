import { Component, OnInit } from '@angular/core';
import { Manager } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as config from '../../../config';

@Component({
	selector: 'app-add-financier',
	templateUrl: './add-financier.component.html',
	styleUrls: ['./add-financier.component.css']
})
export class AddFinancierComponent implements OnInit {
	public angForm: FormGroup;
	public fio: string;
	public phone: string;
	public errorMsg: string;

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
	}

	ngOnInit() {}

	createForm() {
		this.angForm = this.fb.group({
			fio: ['', Validators.required],
			phone: ['', Validators.required]
		});
	}

	add() {
		let manager = new Manager('', this.fio, this.phone, null, false);
		this.http
			.post(
				config.urlBack + '/api/financiers',
				{ financier: manager },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					window.location.replace('http://' + window.location.host + '/roles');
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}
}
