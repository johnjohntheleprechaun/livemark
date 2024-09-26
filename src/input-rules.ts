import {inputRules, textblockTypeInputRule, wrappingInputRule} from "prosemirror-inputrules";
import {schema} from "prosemirror-markdown";

const header = textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, match => ({level: match[1].length}));
const blockquote = wrappingInputRule(/^>\s/, schema.nodes.blockquote);

export const livemarkInput = inputRules({
    rules: [
        header,
        blockquote,
    ]
});
