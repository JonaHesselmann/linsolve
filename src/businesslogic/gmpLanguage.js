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
        stream.next(); 
        state.inString = false;
      } else {
        stream.skipToEnd(); 
      }
      return "string"; 
    }

    // Detect strings starting
    if (stream.match('"')) {
      state.inString = true;
      return "string"; 
    }

    // Detect comments starting with #
    if (stream.match("#")) {
      stream.skipToEnd();
      return "comment"; 
    }

    // GMPL Keywords (expanded list)
    if (stream.match(/\b(and|else|mod|union|by|if|not|within|cross|in|or|diff|inter|symdiff|div|less|then)\b/)) {
      return "keyword"; 
}


    // GMPL Operators and punctuation
    if (stream.match(/[+\-*/=<>]/)) {
      return "operator"; 
    }

    // Numbers (both integers and decimals)
    if (stream.match(/^\d+(\.\d+)?/)) {
      return "number"; 
    }

    // Variables (e.g., anything not a keyword, number, or operator)
    if (stream.match(/^[a-zA-Z_]\w*/)) {
      return "variableName"; 
    }

    // Skip any non-matching characters
    stream.next();
    return null; 
  },
});

// Define custom syntax highlighting
const gmplHighlighting = styleTags({
  keyword: tags.keyword,         
  operator: tags.operator,      
  string: tags.string,          
  comment: tags.comment,         
  number: tags.number,          
  variableName: tags.variableName, 
});

// Export a function to use GMPL language
export function gmpl() {
  return gmplParser;
}

export const gmplHighlight = gmplHighlighting;
