import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService, Project, Log } from './service/authentication.service';
import { HttpClient } from '@angular/common/http';
import * as config from '../../config';
import { NgxSpinnerService } from 'ngx-spinner';
import { Translator, TranslatorContainer } from 'angular-translator';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	role = localStorage.getItem('role');
	title = 'investor-project';
	isLogged: boolean;
	host: string;
	href: string;
	projects: Project[];
	errorMsg: string;
	public prCurrent: Project;
	opened: boolean;
	pathURL = window.location.href;

	constructor(
		private loginservice: AuthenticationService,
		private http: HttpClient,
		private spinner: NgxSpinnerService,
		private translatorContainer: TranslatorContainer,
		private route: Router
	) {
		this.routeEvent(this.route);
		this.isLogged = loginservice.isLoggedIn();
		this.host = 'http://' + window.location.host;
		this.href = window.location.href;
		console.log('host = ' + this.host);
		console.log('href = ' + this.href);
		if (
			!loginservice.isLoggedIn() &&
			this.host + '/' != this.href &&
			this.href != this.host + '/registration' &&
			this.href != this.host + '/forgot'
		) {
			window.location.replace('http://' + window.location.host);
		} else if (loginservice.isLoggedIn() && this.host == this.href) {
			window.location.replace('http://' + window.location.host + '/main');
		}
		this.http
			.get(config.urlBack + '/api/projects?role=' + this.role, {
				headers: { 'x-access-token': localStorage.getItem('id_token') }
			})
			.subscribe(
				(res) => this.setProjects(res),
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	routeEvent(router: Router) {
		router.events.subscribe((e) => {
			var url = window.location.href;
			var obj = new Log();
			obj.action = 'User changed route';
			obj.oldValue = this.pathURL;
			obj.newValue = url;

			if (e instanceof NavigationEnd) {
				console.log(e);
				this.pathURL = e.url;
				if (this.pathURL.includes('/project')) {
					let _id = window.location.search.split('&')[0].split('=')[1];
					this.http
						.get(config.urlBack + '/api/projects/project/' + _id, {
							headers: { 'x-access-token': localStorage.getItem('id_token') }
						})
						.subscribe(
							(res) => {
								this.setProject(res, obj);
							},
							(error) => {
								this.errorMsg = error.error.message;
							}
						);
				} else {
					this.http
						.post(
							config.urlBack + '/api/logs/',
							{ log: obj },
							{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
						)
						.subscribe(
							(res) => {},
							(error) => {
								this.errorMsg = error.error.message;
							}
						);
				}
			}
		});
	}

	setProject(res, obj) {
		this.prCurrent = res;
		console.log('prCurrent = ' + this.prCurrent);
		this.http
			.post(
				config.urlBack + '/api/logs/',
				{ log: obj },
				{ headers: { 'x-access-token': localStorage.getItem('id_token') } }
			)
			.subscribe(
				(res) => {},
				(error) => {
					this.errorMsg = error.error.message;
				}
			);
	}

	ngOnInit() {
		let _id = window.location.search.split('&')[0].split('=')[1];
		if (_id) {
			this.http
				.get(config.urlBack + '/api/projects/project/' + _id, {
					headers: { 'x-access-token': localStorage.getItem('id_token') }
				})
				.subscribe(
					(res) => this.setProject3(res),
					(error) => {
						this.errorMsg = error.error.message;
					}
				);
		}
		if (localStorage.getItem('language') != null && localStorage.getItem('language') != '') {
			this.translatorContainer.language = localStorage.getItem('language');
		}
		/** spinner starts on init */
		this.spinner.show();

		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		}, 2000);
	}

	setProjects(res) {
		this.projects = res.data;
	}

	setProject3(res) {
		this.prCurrent = res;
	}

	logout() {
		this.loginservice.logout();
	}

	showHide(id) {
		let element = document.getElementById(id);
		if (element.hidden) element.hidden = false;
		else element.hidden = true;
		/*if(!pr.menu){
      pr.menu = pr._id
    } else
      pr.menu = null
    this.http.put(config.urlBack+'/api/projects/'+pr._id, {project:pr}, {headers: { 'x-access-token': localStorage.getItem("id_token")}})
    .subscribe(res => {
      this.setProject2(res, pr)
      /** spinner starts on init */
		/*this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
		/*  this.spinner.hide();
      }, 2000);
    },
    error => {
      this.errorMsg = error.error.message
    });*/
	}

	setProject2(res, pr) {
		pr = res;
	}
	changeLNG(lang) {
		this.translatorContainer.language = lang;
		localStorage.setItem('language', lang);
	}
}
