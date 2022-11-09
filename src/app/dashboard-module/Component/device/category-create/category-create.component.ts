import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
})
export class CategoryCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId : number = 0;
  @Input() isCreate: boolean = true;

  constructor(private CategoryService: CategoryService, public dialogRef: MatDialogRef<CategoryCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name : new FormControl(),
      state: new FormControl(),
      showIndex: new FormControl(),
    })
  }

  stateChecked: boolean = true;
  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    console.log(this.CreateEditForm.value.state);
    this.stateChecked = event.value;
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) {
      this.CategoryService.GetDetail(this.customerId).subscribe(response => {
        this.stateChecked = response.state;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          code: new FormControl(response.code),
          name : new FormControl(response.name),
          state: new FormControl(response.state),
          showIndex: new FormControl(response.showIndex),

          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  get code() { return this.CreateEditForm.get('code'); }
  get name() { return this.CreateEditForm.get('name') }


  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CategoryService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.CategoryService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }

  }

}