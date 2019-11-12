import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KineListPage } from './kine-list.page';

describe('KineListPage', () => {
  let component: KineListPage;
  let fixture: ComponentFixture<KineListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KineListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KineListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
