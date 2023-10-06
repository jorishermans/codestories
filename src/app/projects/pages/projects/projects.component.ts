import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'twm-projects',
  template: `
    <ng-container>
      <div>
        <div class="text"> Projects </div>
        <div class="buttons">
            <a href="/create">Create new project</a>
        </div>
      </div>
    </ng-container>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./projects.scss']
})
export class ProjectsComponent {
  constructor() {}
}
