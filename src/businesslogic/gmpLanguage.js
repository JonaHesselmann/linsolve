/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

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
    if (stream.match('"') || stream.match("'")) {
    let quoteType = stream.current();
    while (!stream.eol()) {
        if (stream.next() === quoteType) { // Stop when the same quote type is found
            state.inString = false;
            break;
        }
    }
    return "string";
}



    // Detect comments starting with #
    if (stream.match("#")) {
      stream.skipToEnd();
      return "comment";
  } else if (stream.match("/*")) {
      while (!stream.match("*/", false)) { // Keep going until the closing */
          stream.next();
          if (stream.eol()) { // If the line ends without closing, continue to the next line
              break;
          }
      }
      stream.match("*/"); // Match the closing */
      return "comment";
  }


    // GMPL Keywords (expanded list)

    if (stream.match(/\b(and|else|mod|union|by|if|not|within|cross|in|or|diff|inter|symdiff|div|less|then|for|integer|minimize|maximize|model|param|s\.t\.|set|sum|to|var|printf|solve|data|end)\b/)) {
      return "keyword";
  }




    // GMPL Operators and punctuation

    if (stream.match(":=")) {
      return "operator";  // Handle the ':=' operator
  } else if (stream.match(/[+\-*/=<>]/)) {
      return "operator";  // Handle other operators
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
