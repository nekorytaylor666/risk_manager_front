import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSecondEtapComponent } from './project-second-etap.component';

describe('ProjectSecondEtapComponent', () => {
	let component: ProjectSecondEtapComponent;
	let fixture: ComponentFixture<ProjectSecondEtapComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectSecondEtapComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectSecondEtapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
