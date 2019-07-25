import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TappedPage } from './tapped.page';

describe('TappedPage', () => {
  let component: TappedPage;
  let fixture: ComponentFixture<TappedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TappedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TappedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
