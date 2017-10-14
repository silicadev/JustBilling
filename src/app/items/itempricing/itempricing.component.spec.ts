/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ItempricingComponent } from './itempricing.component';

describe('ItempricingComponent', () => {
  let component: ItempricingComponent;
  let fixture: ComponentFixture<ItempricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItempricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItempricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
