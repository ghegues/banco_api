/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VppManualComponent } from './vpp-manual.component';

describe('VppManualComponent', () => {
  let component: VppManualComponent;
  let fixture: ComponentFixture<VppManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VppManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VppManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
