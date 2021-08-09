export default class UI {
    constructor(dfaInstance) {
        this.dfa = dfaInstance;

        this.showAllNodes();
    }
    showAllNodes() {
        document.body.append(this.createStateInputNode());
        document.body.append(this.createTransitionInputNode());
        document.body.append(this.createTransitionSerialisationNode());
        document.body.append(this.createAcceptingStateInputNode());
        this.createTransitionList();
        document.body.append(this.createRunInputNode());
    }
    createStateInputNode() {
        const inputLabel = document.createElement('span');
        inputLabel.textContent = 'Create Node: ';

        const inputStateName = document.createElement('input');
        inputStateName.type = 'text';
        inputStateName.id = 'stateInputStateName';

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'button';
        inputSubmit.value = 'Add';
        inputSubmit.onclick = this.stateInputEvent.bind(this);

        const stateInput = document.createElement('div');
        stateInput.appendChild(inputLabel);
        stateInput.appendChild(inputStateName);
        stateInput.appendChild(inputSubmit);

        return stateInput;
    }
    createTransitionInputNode() {
        const inputLabel = document.createElement('span');
        inputLabel.textContent = 'Create Transition: ';

        const inputStateNameFrom = document.createElement('input');
        inputStateNameFrom.type = 'text';
        inputStateNameFrom.id = 'transitionInputStateNameFrom';
        inputStateNameFrom.placeholder = 'State From';

        const inputSymbolName = document.createElement('input');
        inputSymbolName.type = 'text';
        inputSymbolName.id = 'transitionInputSymbolName';
        inputSymbolName.placeholder = 'Symbol';

        const inputStateNameTo = document.createElement('input');
        inputStateNameTo.type = 'text';
        inputStateNameTo.id = 'transitionInputStateNameTo';
        inputStateNameTo.placeholder = 'State To';

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'button';
        inputSubmit.value = 'Add';
        inputSubmit.onclick = this.transitionInputEvent.bind(this);

        const transitionInput = document.createElement('div');
        transitionInput.appendChild(inputLabel);
        transitionInput.appendChild(inputStateNameFrom);
        transitionInput.appendChild(inputSymbolName);
        transitionInput.appendChild(inputStateNameTo);
        transitionInput.appendChild(inputSubmit);

        return transitionInput;
    }
    createTransitionSerialisationNode() {
        const inputLabel = document.createElement('span');
        inputLabel.textContent = 'Serialise Transition String: ';

        const inputSerialisationString = document.createElement('input');
        inputSerialisationString.type = 'text';
        inputSerialisationString.id = 'transitionSerialisationInputString';

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'button';
        inputSubmit.value = 'Load';
        inputSubmit.onclick = this.serialisationInputEvent.bind(this);

        const serialisationInput = document.createElement('div');
        serialisationInput.appendChild(inputLabel);
        serialisationInput.appendChild(inputSerialisationString);
        serialisationInput.appendChild(inputSubmit);

        return serialisationInput;
    }
    createAcceptingStateInputNode() {
        const inputLabel = document.createElement('span');
        inputLabel.textContent = 'Add Accepting State: ';

        const inputStateName = document.createElement('input');
        inputStateName.type = 'text';
        inputStateName.id = 'acceptingStateInputStateName';

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'button';
        inputSubmit.value = 'Add';
        inputSubmit.onclick = this.acceptingStateInputEvent.bind(this);

        const acceptingStateInput = document.createElement('div');
        acceptingStateInput.appendChild(inputLabel);
        acceptingStateInput.appendChild(inputStateName);
        acceptingStateInput.appendChild(inputSubmit);

        return acceptingStateInput;
    }
    createRunInputNode() {
        const inputLabel = document.createElement('span');
        inputLabel.textContent = 'Run with string: ';

        const inputRunString = document.createElement('input');
        inputRunString.type = 'text';
        inputRunString.id = 'runInputRunString';

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'button';
        inputSubmit.value = 'Add';
        inputSubmit.onclick = this.runInputEvent.bind(this);

        const runInput = document.createElement('div');
        runInput.appendChild(inputLabel);
        runInput.appendChild(inputRunString);
        runInput.appendChild(inputSubmit);

        return runInput;
    }
    createTransitionList() {
        this.transitionList = document.createElement('ul');
        document.body.append(this.transitionList);
    }
    addToTransitionList(stateFrom, stateTo, symbol) {
        const transition = document.createElement('li');
        transition.textContent = `(${stateFrom}) -- ${symbol} -> (${stateTo})`;
        this.transitionList.appendChild(transition);
    }
    stateInputEvent() {
        const state = document.getElementById('stateInputStateName').value;
        try {
            this.dfa.addState(state);
        } catch (err) {
            alert(err);
        }
    }
    transitionInputEvent() {
        const stateFrom = document.getElementById('transitionInputStateNameFrom').value;
        const stateTo = document.getElementById('transitionInputStateNameTo').value;
        const symbol = document.getElementById('transitionInputSymbolName').value;

        try {
            this.dfa.addTransition(stateFrom, stateTo, symbol);
            this.addToTransitionList(stateFrom, stateTo, symbol);
        } catch (err) {
            alert(err);
        }
    }
    serialisationInputEvent() {
        const serialisationString = document.getElementById('transitionSerialisationInputString').value;

        try {
            this.dfa.loadTransitionList(serialisationString, transition => {
                this.addToTransitionList(...transition);
            });
        } catch (err) {
            alert(err);
        }
    }
    acceptingStateInputEvent() {
        const state = document.getElementById('acceptingStateInputStateName').value;
        try {
            this.dfa.addAcceptingState(state);
        } catch (err) {
            alert(err);
        }
    }
    runInputEvent() {
        const runString = document.getElementById('runInputRunString').value;
        try {
            alert(this.dfa.runUntilCompletion(runString).status);
        } catch (err) {
            alert(err);
        }
    }
}
