import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFirstEtapDocsComponent } from './project-first-etap-docs.component';

describe('ProjectFirstEtapDocsComponent', () => {
	let component: ProjectFirstEtapDocsComponent;
	let fixture: ComponentFixture<ProjectFirstEtapDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectFirstEtapDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectFirstEtapDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
