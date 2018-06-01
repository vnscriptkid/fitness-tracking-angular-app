import * as fromRoot from './../app.reducer';
import * as UI from './../shared/ui.actions';
import * as AUTH from './../auth/auth.actions';
import { UIService } from './../shared/ui.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs/Subject';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import 'rxjs/add/operator/takeUntil';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  public isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private afa: AngularFireAuth,
    public snackBar: MatSnackBar,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  registerUser(authData: AuthData) {
    this.afa
    .auth
    .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(success => { })
      .catch(e => {
        this.uiService.showSnackBar(e.message, null, 2000 );
      });
    }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this
      .afa
      .auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(success => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new AUTH.Login());
      })
      .catch(e => {
        this.uiService.showSnackBar(e.message, null, 2000 );
        this.store.dispatch(new UI.StopLoading());
      });
  }

  public initAuthListener() {
    this.afa.authState.takeUntil(this.ngUnsubscribe).subscribe(user => {
        if (user) {
          this.store.dispatch(new AUTH.Login());
          this.router.navigate(['/training']);
        } else {
          this.store.dispatch(new AUTH.Logout());
          this.router.navigate(['/login']);
        }
    });
  }

  logout() {
    this.afa
      .auth
      .signOut()
      .then(success => { })
      .catch(err => { });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
