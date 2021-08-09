import DFA from './lib/DFA.js';
import UI from './lib/UI.js';

window.dfa = new DFA();
window.ui = new UI(window.dfa);
