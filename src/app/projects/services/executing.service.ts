import { Injectable } from "@angular/core";
import { marked } from 'marked';
import { WorkItem } from "../components/structure/structure.model";
import { executeNpmInstall, runCommand, startListening, writeJS } from "./webcontainer.fn";

startListening();

function writeExecutedContent(workItem: WorkItem, data: string) {
    workItem.executedContent = workItem.executedContent ?? '';
    workItem.executedContent += data;
    workItem.executed = true;
    workItem.executedContent$.next(data);
}

@Injectable()
export class ExecutingService {

    public jsFile = 'index.js';

    public execute(workItem: WorkItem) {
        if (workItem.type === 'markdown') {
            workItem.executedContent = marked.parse(workItem.content);
            workItem.executed = true;
        }
        if (workItem.type === 'js') {
            this.executeJS(workItem as WorkItem<{file: string}>);
        }
        if (workItem.type === 'text') {
            workItem.executedContent = `${workItem.content}`;
            workItem.executed = true;
        }
        if (workItem.type === 'npm') {
            this.executeNpm(workItem);
        }
    }

    public async executeJS(workItem: WorkItem<{file: string}>) {
        const fileName = workItem?.context?.file ?? 'index.js';
        await writeJS(fileName, workItem.content);
        const result = await runCommand('node', [fileName]);
        await result.pipeTo(new WritableStream({
            write(data: string) {
                writeExecutedContent(workItem, data);
            }
          }));
    }

    public async executeNpm(workItem: WorkItem) {
        const result = await executeNpmInstall(workItem.content.split(','));
        await result.pipeTo(new WritableStream({
            write(data: string) {
                writeExecutedContent(workItem, data);
            }
          }));
    }
}
