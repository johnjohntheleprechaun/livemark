import {InputRule, inputRules, textblockTypeInputRule, wrappingInputRule} from "prosemirror-inputrules";
import {schema} from "prosemirror-markdown";
import {Transaction} from "prosemirror-state";

export const livemarkInput = inputRules({
    rules: [
        textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, match => ({level: match[1].length})),
        wrappingInputRule(/^>\s$/, schema.nodes.blockquote),
        textblockTypeInputRule(/^```$/, schema.nodes.code_block),
        wrappingInputRule(/^\s*(-|\+|\*)\s$/, schema.nodes.bullet_list),
        wrappingInputRule(/^[0-9](?:\.|\))\s$/, schema.nodes.ordered_list),
        // live italic/bold
        new InputRule(
            /((?:\*|_){1,3})[^*_]+\1([^*_])?$/,
            (state, match, start, end): Transaction => {
                const tr = state.tr;
                console.log(tr);

                tr.delete(end - match[1].length, end);
                tr.delete(start, start + match[1].length);
                tr.insertText(match[2]);

                // if it's odd, which is equivelant to saying if it's one or three
                if (match[1].length % 2 === 1) {
                    tr.addMark(start, end - match[1].length * 2, schema.marks.em.create());
                }
                if (match[1].length >= 2) {
                    tr.addMark(start, end - match[1].length * 2, schema.marks.strong.create());
                }

                return tr;
            }
        ),
    ]
});
