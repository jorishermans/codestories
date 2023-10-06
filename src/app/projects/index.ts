import { NgModule } from '@angular/core';
import { WorkItemCodeComponent } from './components/steps/options/code/workitem-code.component';
import { ExecutingService } from './services/executing.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StructureComponent } from './components/structure/structure.component';
import { StepsRendererComponent } from './components/steps/steps-renderer.component';
import { WorkItemTextComponent } from './components/steps/options/text/workitem-text.component';
import { FormsModule } from '@angular/forms';
import { WorkItemMarkdownComponent } from './components/steps/options/markdown/workitem-markdown.component';
import { CreateComponent } from './pages/create/create-page.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { WorkItemNpmInstallComponent } from './components/steps/options/npm/workitem-npm-install.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [WorkItemCodeComponent, ToolbarComponent,
    StructureComponent, StepsRendererComponent,
    WorkItemCodeComponent, WorkItemTextComponent, WorkItemMarkdownComponent,
    WorkItemNpmInstallComponent, CreateComponent, HomeComponent, ProjectsComponent, TerminalComponent
],
  imports: [
    CommonModule, FormsModule, FontAwesomeModule, MonacoEditorModule
  ],
  providers: [ExecutingService]
})
export class ProjectsModule { }
