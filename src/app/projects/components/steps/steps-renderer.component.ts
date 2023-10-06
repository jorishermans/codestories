import { AfterViewInit, ChangeDetectorRef, Component, InjectionToken, Injector, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { WorkItem } from '../structure/structure.model';
import { WorkItemTextComponent } from './options/text/workitem-text.component';
import { WorkItemMarkdownComponent } from './options/markdown/workitem-markdown.component';
import { WorkItemCodeComponent } from './options/code/workitem-code.component';
import { WorkItemNpmInstallComponent } from './options/npm/workitem-npm-install.component';

export const STEP_WORKITEM = new InjectionToken<WorkItem>('STEP_WORKITEM');
export const STEP_INDEX = new InjectionToken<number>('STEP_INDEX');

@Component({
  selector: 'twm-steps-renderer',
  template: `
    <div class="twm-steps-renderer">
        <div>
          <div class="twm-indicator" *ngIf="workItem.executed">[{{index}}]</div>
          <div class="twm-indicator active" *ngIf="workItem.active">[-]</div>
          <div class="twm-indicator" *ngIf="!workItem.executed && !workItem.active">[ ]</div>
          <div>
            <span class="type">{{translateType(workItem)}}</span>
          </div>
        </div>
        <div><ng-container class="twm-steps-container" #dynamicComponentContainer></ng-container></div>
    </div>
  `,
  styleUrls: ['./steps-renderer.component.scss']
})
export class StepsRendererComponent implements AfterViewInit {
  @Input() workItem!: WorkItem;
  @Input() index!: number;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;

  constructor(private _injector: Injector, private _changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.renderDynamicComponent();
  }

  private renderDynamicComponent() {
    let componentRef;
    this.dynamicComponentContainer.clear();

    const stepInjector = Injector.create({
        providers: [
            { provide: STEP_WORKITEM, useValue: this.workItem },
            { provide: STEP_INDEX, useValue: this.index },
        ],
        parent: this._injector
    });

    switch (this.workItem.type) {
      case 'text':
        componentRef = this.dynamicComponentContainer.createComponent(WorkItemTextComponent, { injector: stepInjector});
        break;
      case 'markdown':
        componentRef = this.dynamicComponentContainer.createComponent(WorkItemMarkdownComponent, { injector: stepInjector});
        break;
      case 'js':
        componentRef = this.dynamicComponentContainer.createComponent(WorkItemCodeComponent, { injector: stepInjector});
        break;
      case 'npm':
        componentRef = this.dynamicComponentContainer.createComponent(WorkItemNpmInstallComponent, { injector: stepInjector});
        break;
      default:
        // Handle unknown type or show an error message
        return;
    }
    this._changeDetectorRef.detectChanges();
  }

  translateType(workItem: WorkItem) {
    if(workItem.type === 'text') { return 'TXT'; }
    if(workItem.type === 'markdown') { return 'MD'; }
    return workItem.type.toUpperCase();
  }
}
