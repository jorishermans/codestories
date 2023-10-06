import { Observable, Subject } from "rxjs";

export interface Notebook {
    items: WorkItem[];
    activeStep: number;
}

export type WorkItemType = 'text' | 'markdown' | 'js' | 'ts' | 'npm'; 

export interface WorkItem<T = {}> {
    type: WorkItemType;
    content: string;
    executedContent?: string;
    executedContent$: Subject<string>;
    executed?: boolean;
    active?: boolean;
    context?: T
}

export const EMPTY_NOTEBOOK = { items: [], activeStep: 0 };
