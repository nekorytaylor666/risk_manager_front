import { Component, OnInit } from '@angular/core';
import { Category } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	categories: Category[];
	errorMsg: string;
	public selectedCategories: Category[];

	constructor(private http: HttpClient) {
		this.getCategories();
		this.selectedCategories = [];
	}

	setCategories(res) {
		this.categories = res.data;
		this.categories.forEach((element) => {
			element.checked = false;
		});
	}

	getCategories() {
		this.http
			.get(config.urlBack + '/api/categories', {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setCategories(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	check(item) {
		if (!item.checked) {
			this.selectedCategories.push(item);
		} else {
			let index = this.selectedCategories.indexOf(item);
			this.selectedCategories.splice(index, 1);
		}
	}

	delete() {
		var listID = [];
		for (let i = 0; i < this.selectedCategories.length; i++) {
			listID.push(this.selectedCategories[i]._id);
		}
		this.http
			.post(
				config.urlBack + '/api/categories/delete',
				{ categories: listID },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => this.getCategories(),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	ngOnInit() {}
}
