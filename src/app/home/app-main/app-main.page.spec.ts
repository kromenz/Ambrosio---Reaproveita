import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMainPage } from './app-main.page';

describe('AppMainPage', () => {
  let component: AppMainPage;
  let fixture: ComponentFixture<AppMainPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
