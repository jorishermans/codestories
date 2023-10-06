import { Component, Inject } from '@angular/core';
import { WorkItem } from '../../../structure/structure.model';
import { STEP_WORKITEM } from '../../steps-renderer.component';

@Component({
  selector: 'twm-workitem-code',
  template: `
    <ng-container>
      <div class="twm-workitem-code small" *ngIf="data.context">The code lives in the file {{data.context.file}}</div>
      <div *ngIf="!data.executed">
        <!-- <code-editor
          mode="javascript"
          [(ngModel)]="data.content"
          ngDefaultControl
        ></code-editor> -->
        <ngx-monaco-editor [options]="editorOptions" [(ngModel)]="data.content"></ngx-monaco-editor>
      </div>
      <div class="readonly" *ngIf="data.executed">
        <ngx-monaco-editor [options]="readOnlyOptions" [(ngModel)]="data.content"></ngx-monaco-editor>
      </div>
      <div class="twm-executed">
        <twm-terminal [data]="data.executedContent$ | async"></twm-terminal>
      </div>
    </ng-container>
    `,
  styleUrls: ['./workitem-code.component.scss']
})
export class WorkItemCodeComponent {
  public editorOptions = {theme: 'vs-dark', language: 'markdown'};
  public readOnlyOptions = {readOnly: true, language: 'markdown'};
  constructor(@Inject(STEP_WORKITEM) public data: WorkItem<{file: string}>) {
    if ( data.type === 'js' ) {
      this.editorOptions.language = 'javascript';
      this.readOnlyOptions.language = 'javascript';
    }
  }
}
