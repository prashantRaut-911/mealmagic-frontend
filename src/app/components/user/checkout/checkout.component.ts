import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  {
  // cartItems: CartItem[] = [];
  // total = 0;
  // shippingAddress = '';
  // billingAddress = '';

  // constructor(
  //   private cartService: CartService,
  //   private authService: AuthService,
  //   private orderService: OrderService
  // ) {}

  // ngOnInit(): void {
  //   this.loadCart();
  // }

  // loadCart() {
  //   this.cartItems = this.cartService.getCartItems();
  //   this.updateTotal();
  // }

  // updateTotal() {
  //   this.total = this.cartService.getTotalAmount();
  // }

  // increaseQty(index: number) {
  //   this.cartItems[index].quantity++;
  //   this.cartService.addToCart(this.cartItems[index].dish);
  //   this.updateTotal();
  // }

  // decreaseQty(index: number) {
  //   if (this.cartItems[index].quantity > 1) {
  //     this.cartItems[index].quantity--;
  //   } else {
  //     this.cartService.removeFromCart(this.cartItems[index].dish._id);
  //   }
  //   this.cartService['updateCart'](); // refresh BehaviorSubject
  //   this.updateTotal();
  // }

  // clearCart() {
  //   if (confirm('Are you sure you want to clear your cart?')) {
  //     this.cartService.clearCart();
  //     this.cartItems = [];
  //     this.total = 0;
  //   }
  // }

  // placeOrder() {
  //   const user = this.authService.getCurrentUser();
  //   if (!user || !user._id) {
  //     alert('Please log in to place an order.');
  //     return;
  //   }

  //   if (!this.shippingAddress || !this.billingAddress) {
  //     alert('Please provide shipping and billing addresses.');
  //     return;
  //   }

  //   const orderPayload = {
  //     user: String(user._id),
  //     shippingAddress: this.shippingAddress,
  //     billingAddress: this.billingAddress,
  //     totalAmount: this.total,
  //     orderItems: this.cartItems.map(item => ({
  //       dishId: item.dish._id,
  //       quantity: item.quantity,
  //     })),
  //   };

  //   this.orderService.addOrder(orderPayload).subscribe({
  //     next: () => {
  //       alert('✅ Order placed successfully!');
  //       this.cartService.clearCart();
  //       this.cartItems = [];
  //       this.total = 0;
  //     },
  //     error: (err: any) => {
  //       console.error('Order failed:', err);
  //       alert('❌ Order failed. Please try again.');
  //     },
  //   });
  // }
}
