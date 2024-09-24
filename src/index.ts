import {baseKeymap} from "prosemirror-commands";
import {keymap} from "prosemirror-keymap";
import {defaultMarkdownParser, schema} from "prosemirror-markdown";
import {EditorState, Transaction} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {livemarkInput} from "./input-rules";

export class LiveMark {
    targetElement: HTMLElement;
    state: EditorState;
    view: EditorView;
    constructor(targetElement: HTMLElement) {
        this.targetElement = targetElement;
        this.state = EditorState.create({
            schema: schema,
            doc: defaultMarkdownParser.parse("# Hello World"),
            plugins: [
                keymap(baseKeymap),
                livemarkInput,
            ],
        });
        this.view = new EditorView(this.targetElement, {
            state: this.state,
            dispatchTransaction: this.transactionHandler.bind(this),
        });
    }
    transactionHandler(transaction: Transaction) {
        const newState = this.view.state.apply(transaction);
        this.view.updateState(newState);
    }
}
