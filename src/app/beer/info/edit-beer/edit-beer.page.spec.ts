import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeerPage } from './edit-beer.page';

describe('EditBeerPage', () => {
  let component: EditBeerPage;
  let fixture: ComponentFixture<EditBeerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBeerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
