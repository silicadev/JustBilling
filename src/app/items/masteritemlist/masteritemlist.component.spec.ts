/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MasteritemlistComponent } from './masteritemlist.component';

describe('MasteritemlistComponent', () => {
  let component: MasteritemlistComponent;
  let fixture: ComponentFixture<MasteritemlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteritemlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteritemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
