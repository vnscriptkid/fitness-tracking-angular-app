import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as fromRoot from '../../app.reducer';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav;
  isLoggined$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoggined$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onSignOut() {
    this.authService.logout();
  }

}
