import { Component, Inject } from '@angular/core';
import { WorkItem } from '../../../structure/structure.model';
import { STEP_WORKITEM } from '../../steps-renderer.component';

@Component({
  selector: 'twm-workitem-npm-install',
  template: `
    <ng-container>
      <div class="twm-workitem-text">
        <div class="text" *ngIf="!data.active"> {{ data.content }} </div>
        <div class="text active" *ngIf="data.active"> 
          <input class="twm-install" [(ngModel)]="data.content" />
        </div>
      </div>
      <div class="twm-executed">
        <twm-terminal [data]="data.executedContent$ | async"></twm-terminal>
      </div>
    </ng-container>
    `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workitem-npm-install.component.scss']
})
export class WorkItemNpmInstallComponent {

  constructor(@Inject(STEP_WORKITEM) public data: WorkItem) { }
  
}
