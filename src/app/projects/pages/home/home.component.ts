import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'twm-home',
  template: `
    <ng-container>
      <div>
        <h2> Welcome </h2>
        <p>This is all about creating code stories. This idea started off when I created video's for my youtube channel typewithme.
        Creating and learning around javascript and typescript can be a hard thing todo. When preparing video's and learning about new technology you need a tool to guide you with that.
        So this is the kind of tool I created for you.</p>
        <div class="buttons">
            <a href="/create">Start your journey</a>
        </div>
      </div>
    </ng-container>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  constructor() {}
}
