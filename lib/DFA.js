export default class DFA {
    /* 
        Chainable functions:
        - addState
        - removeState
        - renameState
        - addTransition
        - removeTransitionFromState
        - removeTransitionsBySymbol
        - renameTransitionsBySymbol
        - addAcceptingState
        - removeAcceptingState
        - runAlphabetTest
        - loadStateList
        - loadTransitionList

        Global state returning functions:
        - init
        - step
        - runUntilCompletion

    */
    constructor() {
        this.states = {
            init: {}
        };
        this.acceptingStates = [];
        this.globalState = {
            status: null,
            input: null,
            stepIndex: 0,
            currentState: null
        };
    }
    addState(state) {
        if (this.states[state]) throw new Error('Cannot add an already existing state');

        this.states[state] = {};

        return this;
    }
    removeState(state) {
        if (state === 'init') throw new Error('Cannot remove init state');
        if (!this.states[state]) throw new Error('Cannot remove a non-existent state');

        delete this.states[state];

        return this;
    }
    renameState(oldName, newName) {
        if (!this.states[oldName]) throw new Error('Cannot rename a non-existent state');
        if (this.states[newName]) throw new Error('Cannot rename a state to an already existing state');

        for (let state in this.states) {
            if (state === oldName) continue;
            for (let symbol in this.states[state]) {
                if (this.states[state][symbol] === oldName) {
                    this.states[state][symbol] = newName;
                }
            }
        }
        this.states[newName] = this.states[oldName];
        delete this.states[oldName];

        return this;
    }
    addTransition(stateFrom, stateTo, symbol) {
        if (!this.states[stateFrom]) this.addState(stateFrom);
        if (!this.states[stateTo]) this.addState(stateTo);
        if (this.states[stateFrom][symbol])
            throw new Error('Cannot have two transitions on one state with the same symbol');

        this.states[stateFrom][symbol] = stateTo;

        return this;
    }
    removeTransitionFromState(state, symbol) {
        if (!this.states[state]) throw new Error('Cannot remove a transition function from a non-existent state');
        if (!this.states[state][symbol]) throw new Error('Cannot remove a non-existent transition function');

        delete this.states[state][symbol];

        return this;
    }
    removeTransitionsBySymbol(symbol) {
        for (let state in this.states) {
            if (symbol in this.states[state]) {
                delete this.states[state][symbol];
            }
        }

        return this;
    }
    renameTransitionsBySymbol(oldSymbol, newSymbol) {
        for (let state in this.states) {
            if (oldSymbol in this.states[state]) {
                this.states[state][newSymbol] = this.states[state][oldSymbol];
                delete this.states[state][oldSymbol];
            }
        }

        return this;
    }
    addAcceptingState(state) {
        if (!this.states[state]) throw new Error('Cannot set a non-existing state as an accepting state');

        this.acceptingStates.push(state);

        return this;
    }
    removeAcceptingState(state) {
        if (!this.states[state]) throw new Error('Cannot set a non-existing state as a non-accepting state');

        const stateIndex = this.acceptingStates.indexOf(state);
        if (stateIndex > -1) {
            this.acceptingStates.splice(stateIndex, 1);
        }

        return this;
    }

    init(input) {
        this.runAlphabetTest(input);

        this.globalState.status = 'running';
        this.globalState.input = input;
        this.globalState.stepIndex = 0;
        this.globalState.currentState = 'init';

        return this.globalState;
    }

    step() {
        if (this.globalState.stepIndex === this.globalState.input.length) {
            return this.globalState;
        }

        const currentState = this.globalState.currentState;
        const currentSymbol = this.globalState.input[this.globalState.stepIndex];
        const nextState = this.states[currentState][currentSymbol];

        this.globalState.currentState = nextState;
        this.globalState.stepIndex++;

        if (this.globalState.stepIndex === this.globalState.input.length) {
            if (this.acceptingStates.includes(this.globalState.currentState)) {
                this.globalState.status = 'accept';
            } else {
                this.globalState.status = 'reject';
            }
        }

        return this.globalState;
    }

    runUntilCompletion(input) {
        let state = this.init(input);
        while (state.status === 'running') {
            state = this.step();
        }
        return state;
    }

    runAlphabetTest(testInput) {
        // tests if a transition function is defined on every state for every symbol in the alphabet
        // if an input is supplied, check those as well

        // get all symbols in the DFAs alphabet
        const alphabet = testInput ? testInput.split('') : [];
        for (let state in this.states) {
            for (let symbol in this.states[state]) {
                if (!alphabet.includes(symbol)) {
                    alphabet.push(symbol);
                }
            }
        }
        // throw error if there exists a state that does not have a transition for a symbol in the alphabet
        for (let state in this.states) {
            for (let symbol of alphabet) {
                if (!this.states[state][symbol]) {
                    throw new Error(`State '${state}' does not have a transition function for the symbol '${symbol}'`);
                }
            }
        }

        return this;
    }

    loadStateList(list) {
        // s1, s2, s3, s4, ...
        const states = list.split(',');
        for (let state of states) {
            state = state.trim();
            if (state === 'init') continue;
            this.addState(state);
        }

        return this;
    }

    loadTransitionList(list) {
        // s1, a, s2; s1, b, s3; ...
        const transitions = list.split(';');
        for (let transition of transitions) {
            transition = transition.split(',').map(str => str.trim());
            this.addTransition(...transition);
        }

        return this;
    }
}
