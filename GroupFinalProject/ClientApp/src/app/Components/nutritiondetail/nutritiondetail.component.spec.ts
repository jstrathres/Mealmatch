import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritiondetailComponent } from './nutritiondetail.component';

describe('NutritiondetailComponent', () => {
  let component: NutritiondetailComponent;
  let fixture: ComponentFixture<NutritiondetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutritiondetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritiondetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
