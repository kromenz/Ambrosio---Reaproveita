import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutrosPage } from './outros.page';

describe('OutrosPage', () => {
  let component: OutrosPage;
  let fixture: ComponentFixture<OutrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OutrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
