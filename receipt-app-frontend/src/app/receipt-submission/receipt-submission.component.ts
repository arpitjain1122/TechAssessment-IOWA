import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const selectedDate = new Date(control.value);
  const today = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectedDate > today ? { futureDate: 'The receipt date cannot be in the future.' } : null;
}

@Component({
  selector: 'app-receipt-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add any necessary imports here
  templateUrl: './receipt-submission.component.html',
  styleUrls: ['./receipt-submission.component.css']
})
export class ReceiptSubmissionComponent implements OnInit {
  receiptForm: FormGroup;
  fileToUpload: File | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  todayString: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.todayString = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    this.receiptForm = this.fb.group({
      // date field: required, cannot be in the future
      date: ['', [Validators.required, futureDateValidator]],
      // amount field: required, must match pattern, and must be > 0
      amount: [
        '',
        [
          Validators.required,
          Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$"),
          Validators.min(0.01)
        ]
      ],
      description: ['', Validators.required],
      receipt: [null, Validators.required]
    });
  }

  ngOnInit(): void { }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.fileToUpload = event.target.files[0];
      this.receiptForm.patchValue({
        receipt: this.fileToUpload
      });
    }
  }

  onSubmit(): void {
    if (this.receiptForm.invalid) {
      this.receiptForm.markAllAsTouched();
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;

    const formData = new FormData();
    formData.append('date', this.receiptForm.get('date')?.value);
    formData.append('amount', this.receiptForm.get('amount')?.value);
    formData.append('description', this.receiptForm.get('description')?.value);
    if (this.fileToUpload) {
      formData.append('receipt', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.post('http://localhost:9020/api/receipts', formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = 'There was an error submitting your receipt.';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Network error: ${error.error.message}`;
          } else {
            errorMsg = `Server error (${error.status}): ${error.error?.message || error.message}`;
          }
          this.errorMessage = errorMsg;
          console.error('Submission error:', error);
          return throwError(() => new Error(errorMsg));
        })
      )
      .subscribe({
        next: (res) => {
          this.successMessage = 'Receipt submitted successfully!';
          this.receiptForm.reset();
          this.fileToUpload = null;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        }
      });
  }
}