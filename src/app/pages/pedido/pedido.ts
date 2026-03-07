import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Order, OrderService } from '../../services/order.service';

interface Pizza {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css']
})
export class PedidoComponent implements OnInit, OnDestroy {

  cart: Pizza[] = [];
  total: number = 0;

  orderId: string | null = null;
  orderStatus: string = '';

  message: string = '';
  messageType: 'success' | 'error' | 'info' = 'info';

  customerId: string = '';

  private cartCheckInterval?: ReturnType<typeof setInterval>;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('customerId');
      this.customerId = id ?? `CUSTOMER_${Date.now()}`;
      console.log('Customer ID inicializado:', this.customerId);

      // Carrega carrinho e inicia verificação periódica
      this.loadCartFromRedis();
      this.startCartCheckInterval();
    });
  }

  ngOnDestroy(): void {
    if (this.cartCheckInterval) clearInterval(this.cartCheckInterval);
  }

  /** ---------------- Redis Cart ---------------- */
  private loadCartFromRedis(): void {
    if (!this.customerId) return;

    this.orderService.getCartFromRedis(this.customerId).subscribe({
      next: (order: Order | null) => {
        const items = order?.items ?? []; // fallback: array vazio
        this.cart = items.map(item => ({
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity)
        }));
        this.total = order?.total ?? this.calculateTotal(); // fallback: calcula total
        console.log('Carrinho carregado do Redis:', this.cart, 'Total:', this.total);
      },
      error: (err: any) => {
        console.error('Erro ao buscar carrinho no Redis', err);
        this.cart = [];
        this.total = 0;
      }
    });
  }

  /** ---------------- Envio do Pedido ---------------- */
  enviarPedido(): void {
    if (!this.cart.length) {
      this.showMessage('Carrinho vazio', 'error');
      return;
    }

    const order: Order = {
      customerId: this.customerId,
      items: this.cart.map(p => ({ name: p.name, price: p.price, quantity: p.quantity })),
      total: this.calculateTotal()
    };

    console.log('Enviando pedido final:', order);

    this.orderService.createOrder(order).subscribe({
      next: (resp: Order) => {
        this.orderId = resp.id ?? null;
        this.orderStatus = resp.status ?? 'CREATED';
        this.showMessage('Pedido criado com sucesso!', 'success');
        this.clearCart();
      },
      error: (err: any) => {
        console.error('Erro ao criar pedido', err);
        this.showMessage('Erro ao criar pedido', 'error');
      }
    });
  }

  /** ---------------- Intervalo para checar carrinho ---------------- */
  private startCartCheckInterval(): void {
    if (!this.customerId) return;

    this.cartCheckInterval = setInterval(() => {
      this.orderService.checkCartExists(this.customerId).subscribe({
        next: (exists: boolean) => {
          if (!exists) {
            this.clearCart();
            this.showMessage('Carrinho expirou', 'info');
          }
        },
        error: (err: any) => console.error('Erro ao verificar carrinho', err)
      });
    }, 5000);
  }

  /** ---------------- Helpers ---------------- */
  private clearCart(): void {
    this.cart = [];
    this.total = 0;
  }

  private calculateTotal(): number {
    return this.cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  private showMessage(msg: string, type: 'success' | 'error' | 'info'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 4000);
  }

  trackByName(index: number, pizza: Pizza): string {
    return pizza.name;
  }

}