# DFA

Simulates a given DFA.

https://bryn.compsci.group/DFA/

## Usage

View the webpage in your browser and open the developer console.

For now, `dfa` is loaded as a global variable (a DFA instance). Reload the page to reset the DFA.

Using `dfa.addState("stateName")` will create a state called _stateName_.

Alternatively, using `dfa.loadStateList("s1,s2,s3")` will add many states at once (separated by commas.)

The state _init_ is added when a new DFA instance is initialised.

Using `dfa.addTransition("stateFrom", "stateTo", "symbol")` will add a transition function for the two states and symbol specified.

Alternatively, using `dfa.loadTransitionList("init,s1,a;init,s2,b")` will add many transition functions at once (each transition function should be separated by semicolons, and each argument separated by commas.)

States can be marked as accepting states using `addAcceptingState("stateName")`.

The DFA can be simulated using `dfa.runUntilCompletion("language")` and a global state containg the last state and status (either reject/accept) will be returned.

To manually step through the DFA, first call `dfa.input("language")`, then call `dfa.step()`. The both functions return the global state, and the DFA is finished when the status is 'accept' or 'reject', otherwise it is 'running'

Both runUntilCompletion and input functions will reset the global state, so a new DFA does not have to be initialised after it has finished running with a given language.

A transition function must be defined on every state for every symbol in the alphabet. Note there is no stored alphabet in the DFA instance, but the `dfa.runAlphabetTest()` function will build an alphabet from all symbols used. If this condition is not met, `dfa.init()` will throw an error.

There are several methods on the DFA class (and instances) that allow deletion and renaming of states/transitions/symbols. These are all in lib/DFA.js

Note that leading and trailing whitespace is culled for each element in loadStateList and loadTransitionList. (i.e., something like "init , s2 ,a" is parsed as "init,s2,a")

## TODO

-   make an actual UI
