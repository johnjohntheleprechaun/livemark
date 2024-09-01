import {EditorState, Transaction} from "prosemirror-state";
import {EditorView} from "prosemirror-view";

export class LiveMark {
    targetElement: HTMLElement;
    state: EditorState;
    view: EditorView;
    constructor(targetElement: HTMLElement) {
        this.targetElement = targetElement;
        this.state = EditorState.create({});
        this.view = new EditorView(this.targetElement, {
            state: this.state,
            dispatchTransaction: this.transactionHandler,
        });
    }
    transactionHandler(transaction: Transaction) {
        const newState = this.view.state.apply(transaction);
        this.view.updateState(newState);
    }
}
