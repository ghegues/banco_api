/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SenhasDiariasComponent } from './SenhasDiarias.component';

describe('SenhasDiariasComponent', () => {
  let component: SenhasDiariasComponent;
  let fixture: ComponentFixture<SenhasDiariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhasDiariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenhasDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
