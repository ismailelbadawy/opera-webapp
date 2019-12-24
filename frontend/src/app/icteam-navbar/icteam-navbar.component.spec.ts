import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcteamNavbarComponent } from './icteam-navbar.component';

describe('IcteamNavbarComponent', () => {
  let component: IcteamNavbarComponent;
  let fixture: ComponentFixture<IcteamNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcteamNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcteamNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
