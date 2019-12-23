import { Component, OnInit } from '@angular/core';
import { Category } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as config from '../../../config';

@Component({
	selector: 'app-edit-category',
	templateUrl: './edit-category.component.html',
	styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
	public angForm: FormGroup;
	public name: string;
	public errorMsg: string;

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.createForm();
		this.name = window.location.search.split('&')[1].split('=')[1];
	}

	ngOnInit() {}

	createForm() {
		this.angForm = this.fb.group({
			name: ['', Validators.required]
		});
	}

	save() {
		let _id = window.location.search.split('&')[0].split('=')[1];
		let category = new Category(_id, this.name, false);
		this.http
			.put(
				config.urlBack + '/api/categories',
				{ category: category },
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
