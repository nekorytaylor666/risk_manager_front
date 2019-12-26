import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGantNewComponent } from './project-gant-new.component';

describe('ProjectGantNewComponent', () => {
  let component: ProjectGantNewComponent;
  let fixture: ComponentFixture<ProjectGantNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGantNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGantNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
