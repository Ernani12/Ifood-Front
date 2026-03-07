import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaListComponent } from '../pizza-list/pizza-list';

describe('PizzaList', () => {
  let component: PizzaListComponent;
  let fixture: ComponentFixture<PizzaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
