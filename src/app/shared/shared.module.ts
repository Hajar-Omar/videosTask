import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, FormsModule, BarRatingModule, MatSnackBarModule
  ],
  exports: [
    MatTableModule, MatSortModule, MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, FormsModule, BarRatingModule, MatSnackBarModule
  ]
})
export class SharedModule { }
