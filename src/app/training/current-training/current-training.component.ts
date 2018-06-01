import { take } from 'rxjs/operators';
import { State } from './../../app.reducer';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as fromFoot from '../training.reducer';
import { Store } from '@ngrx/store';
import { StopTraining } from '../training.actions';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  // @Input() currentExercise: Exercise;
  // @Output() stopTraining: EventEmitter<void> = new EventEmitter<void>();
  // currentExercise$: Observable<Exercise>;
  // private subscription: Subscription;
  activeTraining: Exercise = null;
  progress = 0;
  private percentForOneSecond: number;
  timer: number;

  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromFoot.State>
  ) { }

  ngOnInit() {
    this.store.select(fromFoot.getActiveTraining).pipe(take(1)).subscribe((result: Exercise) => {
      this.activeTraining = result;
      this.startOrResumeTimer();
      this.percentForOneSecond = 100 / this.activeTraining.duration;
    });

    // console.log('percent for 1 second: ', this.percentForOneSecond);
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      const currentValue = +(this.progress + this.percentForOneSecond).toFixed(2)
      this.progress = currentValue > 100 ? 100 : currentValue;
      if (this.progress >= 100) {
        clearInterval(this.timer);
        // complete
        // this.trainingService.completeExercise();
        this.store.dispatch(new StopTraining());
      }
    }, 1000);
    // console.log('start timer: ', this.timer);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: { progress: this.progress }
    });

    dialogRef.afterClosed().subscribe(isStop => {
      console.log('The dialog was closed, result: ', isStop);
      if (isStop) {
        // this.stopTraining.emit();
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
