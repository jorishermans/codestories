import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY_NOTEBOOK } from '../../components/structure/structure.model';

@Component({
  selector: 'twm-projects',
  template: `
    <ng-container>
      <div>
        <!-- <div class="text"> New Project </div> -->
        <twm-structure [data]="notebook"></twm-structure>
      </div>
    </ng-container>
    `,
  styleUrls: ['./create.scss']
})
export class CreateComponent {
  public notebook = EMPTY_NOTEBOOK;
  constructor() {}
}
