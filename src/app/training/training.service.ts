import { SET_AVAILABLE_TRAINING,
  SetAvailableTraining,
  START_TRAINING,
  StartTraining,
  StopTraining,
  SetFinishedTraining } from './training.actions';
import { Store } from '@ngrx/store';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import * as fromTraining from './training.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class TrainingService implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  private activeTraining: Exercise = null;

  constructor(private afs: AngularFirestore, private store: Store<fromTraining.State> ) { }

  public fetchAvailableExercises() {
    this.afs
      .collection('availableExercises')
      .snapshotChanges()
      .takeUntil(this.ngUnsubscribe)
      .map(docArray => {
          return docArray.map(e => ({
            id: e.payload.doc.id,
            ...e.payload.doc.data()
        }));
      }).subscribe((result: Exercise[]) => {
        this.store.dispatch(new SetAvailableTraining(result));
      });
    }

  public fetchTrainingRecords() {
    this.afs.collection('exerciseRecords').valueChanges().takeUntil(this.ngUnsubscribe)
      .subscribe((result: Exercise[]) => {
        this.store.dispatch(new SetFinishedTraining(result));
      });
  }

  // activeTraining only exists on local machine
  public setActiveTraining(id: string) {
    this.store.dispatch(new StartTraining(id));
  }

  // when complete or cancel activeTraining, it will save to records on db (automatically sync with store)
  public completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((currentTraining: Exercise) => {
      this.afs.collection('exerciseRecords')
        .add({ ...currentTraining, date: new Date(), state: 'completed' })
        .then(success => {
          this.store.dispatch(new StopTraining());
        });
    });
  }

  public cancelExercise(percentNow: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((currentTraining: Exercise) => {
      this.afs.collection('exerciseRecords').add(
        {
          ...currentTraining,
          date: new Date(),
          state: 'cancelled',
          percentNow,
          calories: currentTraining.calories * percentNow / 100
        }
      ).then(success => {
        this.store.dispatch(new StopTraining());
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
