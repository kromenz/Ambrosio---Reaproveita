import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagIniPage } from './pag-ini.page';

describe('PagIniPage', () => {
  let component: PagIniPage;
  let fixture: ComponentFixture<PagIniPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagIniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
