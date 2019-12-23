import { Component, OnInit } from '@angular/core';
import { Notification } from '../service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../config';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	role = localStorage.getItem('role');

	urlBack = config.urlBack;
	errorMsg: string;
	public notifications: Notification[];

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http
			.get(config.urlBack + '/api/notifications?role=' + this.role, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setNotification(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	setNotification(res) {
		this.notifications = res;
	}
}
