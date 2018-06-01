import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav;
  isLoggined$: Observable<boolean>;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoggined$ = this.store.select(fromRoot.getIsAuthenticated);
    this.isLoggined$.subscribe(result => {
    });
  }

  onSignOut() {
    this.authService.logout();
  }
}
