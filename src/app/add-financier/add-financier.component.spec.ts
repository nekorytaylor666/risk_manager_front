import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinancierComponent } from './add-financier.component';

describe('AddFinancierComponent', () => {
	let component: AddFinancierComponent;
	let fixture: ComponentFixture<AddFinancierComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddFinancierComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddFinancierComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
