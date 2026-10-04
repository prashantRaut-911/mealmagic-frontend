import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view-orders',
  templateUrl: './user-view-orders.component.html',
  styleUrls: ['./user-view-orders.component.css']
})
export class UserViewOrdersComponent {
orders = [
    {
      _id: 'ORD001',
      orderStatus: 'Pending',
      totalAmount: 480,
      shippingAddress: 'Pune, Maharashtra',
      orderDate: new Date(),
      orderItems: [
        {
          orders: {
            dishName: 'Paneer Tikka',
            cuisine: 'North Indian',
            price: 240,
            coverImage: { path: 'assets/sample1.jpg' }
          }
        }
      ]
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Processing': return 'status-processing';
      case 'Delivered': return 'status-delivered';
      case 'Completed': return 'status-completed';
      case 'Received': return 'status-received';
      default: return '';
    }
  }

  onStatusChange(order: any) {
    Swal.fire({
      icon: 'info',
      title: 'Status Updated',
      text: `Order #${order._id} marked as "${order.orderStatus}"`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  }
}