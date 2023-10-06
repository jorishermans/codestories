import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Notebook, WorkItem, WorkItemType } from './structure.model';
import { ExecutingService } from '../../services/executing.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'twm-structure',
  template: `
    <ng-container>
      <twm-toolbar (play)="play()" (back)="back()"></twm-toolbar>
      <div *ngIf="!data">
        <div class="text"> No data is been presented </div>
      </div>
      <div *ngIf="data && data.items.length === 0">
        This notebook is empty
      </div>
      <div *ngIf="data && data.items.length > 0" class="twm-steps">
        <div *ngFor="let item of data.items; let i = index;" [ngClass]="{'active': i === data.activeStep}">
          <twm-steps-renderer [workItem]="item" [index]="i"></twm-steps-renderer>
        </div>  
      </div>
      <div class="add">
        +
        <span (click)="add('text')">TXT</span> 
        <span (click)="add('markdown')">MD</span> 
        <span (click)="add('js')">JS</span>
        <span (click)="add('npm')">NPM</span> 
        <!-- span (click)="add('ts')">TS</span-->
      </div>
    </ng-container>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./structure.scss']
})
export class StructureComponent {
  @Input() data!: Notebook;

  constructor(public executingService: ExecutingService) {}

  add(type: WorkItemType) {
    const empty = this.data.items.length === 0;
    const element: WorkItem = {type: type, content: 'test', active: empty,
      executedContent$: new Subject<string>()};
    if ( type === 'js' ) {
       element.context = {file: 'index.mjs'};
    }
    if ( type === 'npm' ) { element.content = 'cowsay' };
    this.data.items.push(element);
  }

  play() {
    if (this.data.items.length -1 >= this.data.activeStep) {
        this.executingService.execute(this.data.items[this.data.activeStep]);
        this.data.items[this.data.activeStep].active = false; 
        this.data.activeStep++;
        this.data.items[this.data.activeStep].active = true;
    }
  }
  back() { 
    if (this.data.activeStep === 0) return;
    this.data.items[this.data.activeStep].active = false; 
    this.data.activeStep--;
    this.data.items[this.data.activeStep].active = true;
  }
}
