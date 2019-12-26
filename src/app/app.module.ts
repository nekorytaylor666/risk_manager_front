import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResizableModule } from 'angular-resizable-element';
import {
	MatSidenavModule,
	MatListModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatRippleModule,
	MatDatepickerModule,
	MatIconModule,
	MatSliderModule,
	MatNativeDateModule,
	MatToolbarModule,
	MatTreeModule,
	MatCardModule,
	MatProgressBarModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLogHandler, TranslatorModule } from 'angular-translator';
//import { GoogleChartsModule } from 'angular-google-charts';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RolesComponent } from './roles/roles.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { ZayavkaComponent } from './zayavka/zayavka.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ProjectRoleComponent } from './project-role/project-role.component';
import { EditProjectRoleComponent } from './edit-project-role/edit-project-role.component';
import { AddProjectRoleComponent } from './add-project-role/add-project-role.component';
import { ProjectGantComponent } from './project-gant/project-gant.component';
import { ProjectAnketaComponent } from './project-anketa/project-anketa.component';
import { ProjectSecondEtapComponent } from './project-second-etap/project-second-etap.component';
import { ProjectFirstEtapDocsComponent } from './project-first-etap-docs/project-first-etap-docs.component';
import { ProjectSpkDocsComponent } from './project-spk-docs/project-spk-docs.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { GuideComponent } from './guide/guide.component';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import { AddFinancierComponent } from './add-financier/add-financier.component';
import { ProjectGantNewComponent } from './project-gant-new/project-gant-new.component';
import {
	GanttModule,
	EditService,
	SelectionService,
	ToolbarService,
	DayMarkersService
} from '@syncfusion/ej2-angular-gantt';

export class MyTLH extends TranslateLogHandler {
	info(message: string): void {
		if (console && console.info) {
			console.info(message);
		}
	}

	debug(message: string): void {
		if (console && console.log) {
			console.log(message);
		}
	}
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		MainComponent,
		RegistrationComponent,
		ForgotComponent,
		RolesComponent,
		AddManagerComponent,
		ZayavkaComponent,
		CategoryComponent,
		AddCategoryComponent,
		EditCategoryComponent,
		ProjectRoleComponent,
		EditProjectRoleComponent,
		AddProjectRoleComponent,
		ProjectGantComponent,
		ProjectAnketaComponent,
		ProjectSecondEtapComponent,
		ProjectFirstEtapDocsComponent,
		ProjectSpkDocsComponent,
		CabinetComponent,
		NotificationComponent,
		HomeComponent,
		NoteComponent,
		GuideComponent,
		AddLawyerComponent,
		AddFinancierComponent,
		ProjectGantNewComponent
	],
	imports: [
		BrowserModule,
		GanttModule,
		AppRoutingModule,
		FileUploadModule,
		FormsModule,

		FlexLayoutModule,
		ReactiveFormsModule,
		ResizableModule,
		HttpClientModule,
		TranslatorModule.forRoot({
			providedLanguages: ['ru', 'en', 'kz'],
			defaultLanguage: 'kz',
			detectLanguage: true
		}),
		MatSidenavModule,
		MatListModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatRippleModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatIconModule,
		MatSliderModule,
		MatToolbarModule,
		MatTreeModule,
		MatMomentDateModule,
		MatCardModule,
		MatProgressBarModule,
		NgMultiSelectDropDownModule.forRoot(),
		NgxSpinnerModule
		//GoogleChartsModule.forRoot()
		//Ng2GoogleChartsModule
	],
	providers: [
		{ provide: TranslateLogHandler, useClass: MyTLH },
		EditService,
		SelectionService,
		ToolbarService,
		DayMarkersService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
