import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHallsComponent } from './view-halls.component';

describe('ViewHallsComponent', () => {
  let component: ViewHallsComponent;
  let fixture: ComponentFixture<ViewHallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
