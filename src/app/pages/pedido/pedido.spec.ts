import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoComponent } from '../pedido/pedido';

describe('PedidoComponent', () => {
  let component: PedidoComponent;
  let fixture: ComponentFixture<PedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // importante
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});