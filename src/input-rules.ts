import {InputRule, inputRules} from "prosemirror-inputrules";
import {schema} from "prosemirror-markdown";
import {Transaction} from "prosemirror-state";

const headerRule = new InputRule(
    /(#+)\s/m,
    (state, match, start, end): Transaction => {
        const tr = state.tr;
        if (match[1]) {
            console.log(match);
            tr.delete(start, end);
            tr.setBlockType(start, start, schema.nodes.heading, {level: match[1].length});
        }
        return tr;
    },
);

export const livemarkInput = inputRules({
    rules: [
        headerRule,
    ]
});
