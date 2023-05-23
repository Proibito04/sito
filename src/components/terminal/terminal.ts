import type { Terminal, ITheme } from 'xterm';
import 'xterm/css/xterm.css';

let term: Terminal;

export const ThemeTerminal: ITheme = {
  background: '#080F09'
}


export function initializeTerminal(terminal: Terminal, element: HTMLElement) {
  term = terminal;
  term.open(element);
  let command = '';
  let hasInput = false;

  print('Welcome *to* the *terminal!*');

  const ANSI_COLOR_RESET = "\u001b[0m";
  const ANSI_COLOR_CYAN = "\u001b[36m";
  const ANSI_COLOR_YELLOW = "\u001b[33m";

  const promptSymbol = `${ANSI_COLOR_CYAN}>${ANSI_COLOR_RESET} `;
  let placeholder = `${promptSymbol}\u001b[38;5;250m type \"help\" for start...`;
  term.write(placeholder);
  term.onKey(({ key }) => {

    if (!hasInput) {
    
      term.write(`\r${' '.repeat(placeholder.length)} \r${promptSymbol}`);
      hasInput = true;
    }

    const printable = !key.charCodeAt(0).toString().startsWith('27');

      switch (key) {
      case '\r': // Enter key
        term.writeln(`\r\n${promptSymbol}You typed: ${command} \u001b[0m`);
        command = '';
        break;
      case '\u007F': // Backspace key
        if (command !== '') {
          term.write('\b \b');
          command = command.slice(0, -1);
        }
        break;
      default:
        if (printable) {
          term.write(key);
          command += key;
        }
    }
  });
}


function print(text: string) {
  let result = text.replace(/\*([^\*]+)\*/g, '\x1b[1m$1\x1b[22m');
  result = result.replace(/-([^-]+)-/g, '{$1}');

  term.writeln(result);

}

