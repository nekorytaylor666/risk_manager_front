import { Component, OnInit } from '@angular/core';
import { Category } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as config from '../../../config';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
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
		let manager = new Category('', this.name, false);
		this.http
			.post(
				config.urlBack + '/api/categories',
				{ category: manager },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {
					window.location.replace('http://' + window.location.host + '/category');
				},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}
}
