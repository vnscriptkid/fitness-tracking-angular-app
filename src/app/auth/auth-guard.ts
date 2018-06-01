import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { AuthService } from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  canActivate() {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }

  canLoad() {
    return this.store.select(fromRoot.getIsAuthenticated).pipe(take(1));
  }
}
