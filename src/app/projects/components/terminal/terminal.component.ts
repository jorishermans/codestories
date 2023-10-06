import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';

@Component({
  selector: 'twm-terminal',
  template: `
    <ng-container>
      <div class="twm-executed" #terminal>
      </div>
    </ng-container>
    `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnChanges, OnInit, AfterViewInit {
  
  @Input() public data!: string | null;
  @ViewChild('terminal') terminalEl!: ElementRef;

  private term!: Terminal;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.term = new Terminal();
    this.term.open(this.terminalEl.nativeElement);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
        // this.term.clear();
        this.term.write(changes['data'].currentValue);
    }
  }
}
