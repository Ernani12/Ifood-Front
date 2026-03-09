  import { Component, OnInit, Inject } from '@angular/core';
  import { Router } from '@angular/router';
  import { CommonModule, DecimalPipe, isPlatformBrowser } from '@angular/common';
  import { PLATFORM_ID } from '@angular/core';

  import { OrderService, Order } from '../../services/order.service';

  interface Pizza {
    name: string;
    image: string;
    price: number;
    quantity: number;
  }

  @Component({
    selector: 'app-pizza-list',
    standalone: true,
    imports: [CommonModule, DecimalPipe],
    templateUrl: './pizza-list.html',
    styleUrls: ['./pizza-list.css']
  })
  export class PizzaListComponent implements OnInit {

    pizzas: Pizza[] = [];
    cart: Pizza[] = [];
    customerId = '';

    constructor(
      private router: Router,
      private orderService: OrderService,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    /* ---------------- INIT ---------------- */

    ngOnInit(): void {
      this.initializeCustomer();
      this.loadPizzas();
      
    }

    /* ---------------- CUSTOMER ---------------- */

    private initializeCustomer(): void {

      if (isPlatformBrowser(this.platformId)) {

        const savedCustomer = localStorage.getItem('customerId');

        if (savedCustomer) {
          this.customerId = savedCustomer;
        } else {
          this.customerId = this.generateCustomerId();
          localStorage.setItem('customerId', this.customerId);
        }

      } else {
        this.customerId = this.generateCustomerId();
      }

      console.log('Customer ID:', this.customerId);
    }

    private generateCustomerId(): string {
      return `CUSTOMER_${Date.now()}`;
    }

    /* ---------------- PIZZAS ---------------- */

    private loadPizzas(): void {

      this.pizzas = [
        { name: 'Margherita', image: '/images/pizzas/margherita.jpg', price: 25, quantity: 1 },
        { name: 'Pepperoni', image: '/images/pizzas/pepperoni.jpg', price: 30, quantity: 1 },
        { name: 'Quatro Queijos', image: '/images/pizzas/quatro-queijos.jpg', price: 28, quantity: 1 },
        { name: 'Frango com Catupiry', image: '/images/pizzas/frango-catupiry.jpg', price: 32, quantity: 1 },
        { name: 'Portuguesa', image: '/images/pizzas/portuguesa.jpg', price: 27, quantity: 1 },
        { name: 'Calabresa', image: '/images/pizzas/calabresa.jpg', price: 26, quantity: 1 },
        { name: 'Atum', image: '/images/pizzas/atum.jpg', price: 29, quantity: 1 },
        { name: 'Vegetariana', image: '/images/pizzas/vegetariana.jpg', price: 24, quantity: 1 },
        { name: 'Chocolate', image: '/images/pizzas/chocolate.jpg', price: 30, quantity: 1 },
        { name: 'Marguerita Especial', image: '/images/pizzas/marguerita-especial.jpg', price: 33, quantity: 1 }
      ];
    }

    /* ---------------- CART ---------------- */

    addToCart(pizza: Pizza): void {

      const existing = this.cart.find(p => p.name === pizza.name);

      if (existing) {
        existing.quantity++;
      } else {
        this.cart.push({ ...pizza, quantity: 1 });
      }

      const order: Order = {
        customerId: this.customerId,
        items: this.cart.map(p => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity
        })),
        total: this.calculateTotal()
      };

      // Atualiza BehaviorSubject + salva Redis
      this.orderService.updateCart(order, true);
    }

    isInCart(pizza: Pizza): boolean {
      return this.cart.some(p => p.name === pizza.name);
    }

    private calculateTotal(): number {
      return this.cart.reduce(
        (sum, p) => sum + (p.price * p.quantity),
        0
      );
    }

    /* ---------------- ORDER ---------------- */

    finalizeOrder(): void {

      if (!this.cart.length) return;

      const order: Order = {
        customerId: this.customerId,
        items: this.cart.map(p => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity
        })),
        total: this.calculateTotal()
      };

      this.orderService.saveCartTemporary(order).subscribe({
        next: () => console.log('Carrinho salvo no Redis'),
        error: (err:any) => console.error('Erro ao salvar Redis', err),
        complete: () =>
          this.router.navigate(['/pedido'], {
            queryParams: { customerId: this.customerId }
          })
      });
    }

    /* ---------------- PERFORMANCE ---------------- */

    trackByName(index: number, pizza: Pizza): string {
      return pizza.name;
    }

  }