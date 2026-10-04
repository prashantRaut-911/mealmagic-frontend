import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';


@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  dishForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  formSubmitted = false;
  isEditMode = false;
  dishId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    // Create form
    this.dishForm = this.fb.group({
      dishName: ['', Validators.required],
      description: ['', Validators.required],
      cuisine: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stockQuantity: [null, Validators.required],
      availability: [true],
    });

    // Detect edit mode
    this.dishId = this.route.snapshot.paramMap.get('id') as string;
    this.isEditMode = !!this.dishId;

    if (this.isEditMode) {
      this.loadDishData();
    }
  }

  loadDishData(): void {
    this.dishService.getDishById(this.dishId).subscribe({
      next: (dish: Dish) => {
        this.dishForm.patchValue({
          dishName: dish.dishName,
          description: dish.description,
          cuisine: dish.cuisine,
          price: dish.price,
          availability: dish.availability,
          stockQuantity: dish.stockQuantity,
        });

        // For image preview if coverImage exists
        if (dish.coverImage && (dish.coverImage as any).path) {
          this.previewUrl = `https://8080-fefddffbfaca334814657faebceadbeeddaone.premiumproject.examly.io/${(dish.coverImage as any).path}`;
        }
      },
      error: (err: any) => console.error('Error loading dish:', err)
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.dishForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.dishForm.controls).forEach((key) => {
      formData.append(key, this.dishForm.get(key)?.value);
    });

    if (this.selectedFile) {
      formData.append('coverImage', this.selectedFile);
    }

    if (this.isEditMode) {
      // 🟠 EDIT EXISTING DISH
      this.dishService.updateDish(this.dishId, formData).subscribe({
        next: () => {
          alert('Dish updated successfully!');
          this.router.navigate(['/admin']);
        },
        error: (err: any) => console.error('Error updating dish:', err),
      });
    } else {
      // 🟢 ADD NEW DISH
      this.dishService.addDish(formData).subscribe({
        next: () => {
          alert('Dish added successfully!');
          this.dishForm.reset();
          this.selectedFile = null;
          this.previewUrl = null;
          this.formSubmitted = false;
        },
        error: (err: any) => console.error('Error adding dish:', err),
      });
    }
  }
}
