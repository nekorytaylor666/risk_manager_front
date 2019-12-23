import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZayavkaComponent } from './zayavka.component';

describe('ZayavkaComponent', () => {
	let component: ZayavkaComponent;
	let fixture: ComponentFixture<ZayavkaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ZayavkaComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ZayavkaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
