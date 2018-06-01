import { TrainingService } from './../training.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { StartTraining } from '../training.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExerciseRecords();
  }

  fetchExerciseRecords() {
    this.trainingService.fetchAvailableExercises();
  }

  onNewProgram(selected) {
    const selectedExId = selected.value;
    this.store.dispatch(new StartTraining(selectedExId));
  }

}
