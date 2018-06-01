import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>Hi you!</h1>
    <div mat-dialog-content>
      <p>You got {{ data.progress }} % now! A long journey has been taken</p>
      <p>Are you sure to stop training now?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>Continue</button>
      <button mat-button [mat-dialog-close]="true" >Stop</button>
  </div>
  `
})

export class StopTrainingComponent {
  constructor(
    public dialogRef: MatDialogRef<StopTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
