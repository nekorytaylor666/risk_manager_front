import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectRoleComponent } from './add-project-role.component';

describe('AddProjectRoleComponent', () => {
	let component: AddProjectRoleComponent;
	let fixture: ComponentFixture<AddProjectRoleComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddProjectRoleComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddProjectRoleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
