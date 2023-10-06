import { Component, Inject } from '@angular/core';
import { WorkItem } from '../../../structure/structure.model';
import { STEP_WORKITEM } from '../../steps-renderer.component';

@Component({
  selector: 'twm-workitem-markdown',
  template: `
    <ng-container>
      <div *ngIf="!data.executed">
        <div class="small indicator"></div>
        <ngx-monaco-editor class="my-code-editor" [options]="editorOptions" [(ngModel)]="data.content"></ngx-monaco-editor>
      </div>
      <div *ngIf="data.executed" [innerHTML]="data.executedContent"> </div>
    </ng-container>
    `,
  styleUrls: ['./workitem-markdown.component.scss']
})
export class WorkItemMarkdownComponent {
  editorOptions = {theme: 'vs-dark', language: 'markdown'};
  constructor(@Inject(STEP_WORKITEM) public data: WorkItem) {
  }
}