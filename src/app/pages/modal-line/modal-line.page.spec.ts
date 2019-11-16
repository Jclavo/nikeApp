import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLinePage } from './modal-line.page';

describe('ModalLinePage', () => {
  let component: ModalLinePage;
  let fixture: ComponentFixture<ModalLinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
