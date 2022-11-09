import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
})
export class CategoryDeleteComponent implements OnInit {
  @Input() customerId : number = 0;
  constructor(private CategoryService: CategoryService, public dialogRef: MatDialogRef<CategoryDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.CategoryService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
