import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay, faReplyAll } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'twm-toolbar',
  template: `
    <div class="twm-toolbar">
        <div class="twm-toolbar-item" (click)="play.emit()">
            <fa-icon [icon]="playIcon"></fa-icon>
        </div>
        <div class="twm-toolbar-item" (click)="back.emit()">
            <fa-icon [icon]="backIcon"></fa-icon>
        </div>
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent {
    @Output() public play = new EventEmitter();
    @Output() public back = new EventEmitter();
    playIcon = faPlay;
    backIcon = faReplyAll;
}
