import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailPage } from './beer-detail.page';

describe('BeerDetailPage', () => {
  let component: BeerDetailPage;
  let fixture: ComponentFixture<BeerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
