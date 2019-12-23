import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAnketaComponent } from './project-anketa.component';

describe('ProjectAnketaComponent', () => {
	let component: ProjectAnketaComponent;
	let fixture: ComponentFixture<ProjectAnketaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectAnketaComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectAnketaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
