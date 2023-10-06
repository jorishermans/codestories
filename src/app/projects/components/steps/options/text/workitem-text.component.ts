import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StructureComponent } from '../../../structure/structure.component';
import { WorkItem } from '../../../structure/structure.model';
import { FormsModule } from '@angular/forms';
import { STEP_WORKITEM } from '../../steps-renderer.component';

@Component({
  selector: 'twm-workitem-text',
  template: `
    <ng-container>
      <div class="twm-workitem-text">
        <div class="text" *ngIf="!data.active"> {{ data.content }} </div>
        <div class="text active" *ngIf="data.active"> 
          <textarea class="twm-edit-text" rows="5" cols="5" [(ngModel)]="data.content"></textarea>
        </div>
      </div>
    </ng-container>
    `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workitem-text.component.scss']
})
export class WorkItemTextComponent {

  constructor(@Inject(STEP_WORKITEM) public data: WorkItem) { }
  
}
