import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  customerId?: string;
  items: OrderItem[];
  total?: number;
  status?: 'CREATED' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/orders';

  // 👇 BehaviorSubject para manter o cart sincronizado
  private cartSubject = new BehaviorSubject<Order | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** Atualiza o carrinho local e opcionalmente salva no Redis */
  updateCart(order: Order, saveToRedis: boolean = false) {
    this.cartSubject.next(order);

    if (saveToRedis) {
      this.saveCartTemporary(order).subscribe({
        next: () => console.log('Carrinho salvo no Redis via BehaviorSubject'),
        error: err => console.error('Erro ao salvar carrinho no Redis', err)
      });
    }
  }

  /** Retorna o valor atual do carrinho */
  getCart(): Order | null {
    return this.cartSubject.value;
  }

  /** Envia pedido final para PostgreSQL */
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  /** Salva carrinho temporariamente no Redis */
  saveCartTemporary(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/temporary`, order);
  }

  /** Verifica se o carrinho ainda existe no Redis */
  checkCartExists(customerId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/temporary/exists/${customerId}`);
  }

  /** Busca carrinho do Redis */
 
  getCartFromRedis(customerId: string): Observable<Order | null> {
    return this.http.get<Order>(`${this.apiUrl}/temporary/${customerId}`, { observe: 'response' })
      .pipe(
        map(resp => resp.body ?? { items: [], total: 0 }) // sempre retorna um objeto
      );   
}

getEntregaPedido(orderId: string) {
  // chama o endpoint do microserviço de entrega
  return this.http.get<Order>(`http://localhost:8085/entrega/orders/${orderId}`);
}
}