import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MainComponent } from './main/main.component';
import { RolesComponent } from './roles/roles.component';
import { AddManagerComponent } from './add-manager/add-manager.component';
import { ZayavkaComponent } from './zayavka/zayavka.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ProjectRoleComponent } from './project-role/project-role.component';
import { AddProjectRoleComponent } from './add-project-role/add-project-role.component';
import { EditProjectRoleComponent } from './edit-project-role/edit-project-role.component';
import { ProjectAnketaComponent } from './project-anketa/project-anketa.component';
import { ProjectFirstEtapDocsComponent } from './project-first-etap-docs/project-first-etap-docs.component';
import { ProjectSecondEtapComponent } from './project-second-etap/project-second-etap.component';
import { ProjectSpkDocsComponent } from './project-spk-docs/project-spk-docs.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { GuideComponent } from './guide/guide.component';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import { AddFinancierComponent } from './add-financier/add-financier.component';
import { ProjectGantNewComponent } from './project-gant-new/project-gant-new.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'note', component: NoteComponent },
	{ path: 'guide', component: GuideComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'registration', component: RegistrationComponent },
	{ path: 'forgot', component: ForgotComponent },
	{ path: 'main', component: MainComponent },
	{ path: 'roles', component: RolesComponent },
	{ path: 'add-manager', component: AddManagerComponent },
	{ path: 'add-lawyer', component: AddLawyerComponent },
	{ path: 'add-financier', component: AddFinancierComponent },
	{ path: 'zayavka', component: ZayavkaComponent },
	{ path: 'category', component: CategoryComponent },
	{ path: 'add-category', component: AddCategoryComponent },
	{ path: 'edit-category', component: EditCategoryComponent },
	{ path: 'project-role', component: ProjectRoleComponent },
	{ path: 'add-project-role', component: AddProjectRoleComponent },
	{ path: 'edit-project-role', component: EditProjectRoleComponent },
	{ path: 'project/gant', component: ProjectGantNewComponent },
	{ path: 'project/anketa', component: ProjectAnketaComponent },
	{ path: 'project/Second_etap', component: ProjectSecondEtapComponent },
	{ path: 'project/1etapdocs', component: ProjectFirstEtapDocsComponent },
	{ path: 'project/spkdocs', component: ProjectSpkDocsComponent },
	{ path: 'cabinet', component: CabinetComponent },
	{ path: 'notification', component: NotificationComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
