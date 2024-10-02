import { StreamLanguage } from "@codemirror/language";
import { styleTags, tags } from "@codemirror/highlight";

// Define a more specific GMPL tokenizer
const gmplParser = StreamLanguage.define({
  startState() {
    return { inString: false };
  },
  token(stream, state) {
    // Handle strings
    if (state.inString) {
      if (stream.skipTo('"')) {
        stream.next(); // Consume the closing quote
        state.inString = false;
      } else {
        stream.skipToEnd(); // String continues to the end of the line
      }
      return "string"; // Return the string token
    }

    // Detect strings starting
    if (stream.match('"')) {
      state.inString = true;
      return "string"; // Start string
    }

    // Detect comments starting with #
    if (stream.match("#")) {
      stream.skipToEnd(); // Ignore the rest of the line
      return "comment"; // Return comment token
    }

    // GMPL Keywords (expanded list)
    if (stream.match(/(var|maximize|minimize|subject to|solve|data|parameter|end|set|display|model)\b/)) {
      return "keyword"; // Return keyword token
    }

    // GMPL Operators and punctuation
    if (stream.match(/[+\-*/=<>]/)) {
      return "operator"; // Return operator token
    }

    // Numbers (both integers and decimals)
    if (stream.match(/^\d+(\.\d+)?/)) {
      return "number"; // Return number token
    }

    // Variables (e.g., anything not a keyword, number, or operator)
    if (stream.match(/^[a-zA-Z_]\w*/)) {
      return "variableName"; // Return variable token
    }

    // Skip any non-matching characters
    stream.next();
    return null; // Continue to the next token
  },
});

// Define custom syntax highlighting
const gmplHighlighting = styleTags({
  keyword: tags.keyword,         // Keywords like 'var', 'maximize', etc.
  operator: tags.operator,       // Operators like '+', '-', '*', '/'
  string: tags.string,           // Strings wrapped in quotes
  comment: tags.comment,         // Comments starting with #
  number: tags.number,           // Numbers (integers or decimals)
  variableName: tags.variableName, // Variable names
});

// Export a function to use GMPL language
export function gmpl() {
  return gmplParser;
}

export const gmplHighlight = gmplHighlighting;
