import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpkDocsComponent } from './project-spk-docs.component';

describe('ProjectSpkDocsComponent', () => {
	let component: ProjectSpkDocsComponent;
	let fixture: ComponentFixture<ProjectSpkDocsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectSpkDocsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectSpkDocsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
