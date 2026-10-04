import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  email: string;
  gender: string;
  department: string;
  joiningDate: string;
  salary: number;
  isPermanent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com', gender: 'Male', department: 'HR', joiningDate: '2024-02-01', salary: 50000, isPermanent: true }
  ];

  getAll() {
    return this.employees;
  }

  add(employee: Employee) {
    employee.id = this.employees.length + 1;
    this.employees.push(employee);
  }

  update(id: number, updated: Employee) {
    const index = this.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.employees[index] = { ...updated, id };
    }
  }

  delete(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
