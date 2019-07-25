import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBeerPage } from './new-beer.page';

describe('NewBeerPage', () => {
  let component: NewBeerPage;
  let fixture: ComponentFixture<NewBeerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBeerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
