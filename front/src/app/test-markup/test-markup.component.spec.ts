import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMarkupComponent } from './test-markup.component';

describe('TestMarkupComponent', () => {
  let component: TestMarkupComponent;
  let fixture: ComponentFixture<TestMarkupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestMarkupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
