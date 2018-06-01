import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Exercise } from './../exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs/Subscription';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  ongoingTraining$: Observable<boolean>;
  exercise: Exercise = null;

  constructor(private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.hasActiveTraining);
    this.ongoingTraining$.subscribe(result => console.log('ongoing training changed: ', result));
  }
}
