import type { Terminal, ITheme } from 'xterm';
import 'xterm/css/xterm.css';

let term: Terminal;
const ANSI_COLOR_RESET = "\u001b[0m";
const ANSI_COLOR_CYAN = "\u001b[36m";
const ANSI_COLOR_YELLOW = "\u001b[33m";
const ANSI_COLOR_MAGENTA = "\u001b[35m";
const ANSI_COLOR_GREEN = "\u001b[92m";
const PREFIX = `${ANSI_COLOR_GREEN}$>${ANSI_COLOR_RESET} `;

const NEW_LINE = `\r\n${PREFIX}`;


export const ThemeTerminal: ITheme = {
  background: '#080F09',

}


export async function initializeTerminal(terminal: Terminal, element: HTMLElement) {
  term = terminal;
  const fA = await import("xterm-addon-fit");
  const fitAddon = new fA.FitAddon();
  terminal.loadAddon(fitAddon);
  term.open(element);
  fitAddon.fit();
  let command = '';
  let hasInput = false;

  print('Welcome *to* the *terminal!*\n');



  let placeholder = `${PREFIX}\u001b[38;5;250mtype \"help\" for start...`;
  term.write(placeholder);
  term.onData((args) => {
    const key = args;
    
    if (!hasInput) {
      term.write(`\r${' '.repeat(placeholder.length)} \r${PREFIX}`);
      hasInput = true;
    }

    const printable = key.charCodeAt(0) > 31 && key.charCodeAt(0) < 127;

    switch (key) {
      case '\r':
      case '\u0013': // Enter key
        const commandPrompt: string = /^\w+/.exec(command)?.[0] ?? '';
        switch (commandPrompt) {
          case "":
            term.write(NEW_LINE);
            break;
          case 'help':
            term.write(`\n\r${ANSI_COLOR_CYAN}help${ANSI_COLOR_RESET} - show this help

            \r${PREFIX}`);

            /** TODO
            \r${ANSI_COLOR_CYAN}clear${ANSI_COLOR_RESET} - clear the terminal screen
            \r${ANSI_COLOR_CYAN}echo${ANSI_COLOR_RESET} - echo the input
            \r${ANSI_COLOR_CYAN}about${ANSI_COLOR_RESET} - about me
            \r${ANSI_COLOR_CYAN}contact${ANSI_COLOR_RESET} - contact me
            \r${ANSI_COLOR_CYAN}projects${ANSI_COLOR_RESET} - show my projects
            \r${ANSI_COLOR_CYAN}skills${ANSI_COLOR_RESET} - show my skills
            \r${ANSI_COLOR_CYAN}education${ANSI_COLOR_RESET} - show my education
            \r${ANSI_COLOR_CYAN}experience${ANSI_COLOR_RESET} - show my experience
            \r${ANSI_COLOR_CYAN}exit${ANSI_COLOR_RESET} - exit the terminal
            */
            break
          default:
            print(`\n\rCommand not found: ${commandPrompt}\n${PREFIX}`);
        }
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

  term.write(`${result}`);
}

