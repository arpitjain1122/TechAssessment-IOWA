import { Component } from '@angular/core';
import { ReceiptSubmissionComponent } from "./receipt-submission/receipt-submission.component";

@Component({
  selector: 'app-root',
  imports: [ReceiptSubmissionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
