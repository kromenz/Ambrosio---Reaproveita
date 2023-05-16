import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { EntrarPage } from './entrar.page';

describe('EntrarPage', () => {
  let component: EntrarPage;
  let fixture: ComponentFixture<EntrarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EntrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
