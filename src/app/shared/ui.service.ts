import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UIService {
  public loadingStateChanged = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  public showSnackBar(message, action, duration) {
    this.snackbar.open(message, action, { duration });
  }
}
