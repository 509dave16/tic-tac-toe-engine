# Tic Tac Toe Engine
[![npm](https://img.shields.io/npm/v/tic-tac-toe-engine.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/tic-tac-toe-engine)
[![downloads](https://img.shields.io/npm/dm/tic-tac-toe-engine.svg?style=flat-square)](http://npm-stat.com/charts.html?package=tic-tac-toe-engine&from=2016-05-01)
[![MIT License](https://img.shields.io/npm/l/tic-tac-toe-engine.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

This is a package that is meant to expose a Redux Store and a set of Actions that together facilitate the business logic of a Tic Tac Toe app.
This package was written using the SAM pattern to facilitate unidirectional data flow(a.k.a the reactive loop of an application).

# Install
```
npm install --save tic-tac-toe-engine
```

# Usage
```
//ES6
import createEngine from 'tic-tac-toe-engine';
//CommonJS
const createEngine = require('tic-tac-toe-engine');

const api = createEngine("<firebase url here>");//Can optionally pass a Redux Enhancer as the second argument which will be used when creating the Redux Store
const { store, actions } = api;
```

# Examples

### [Web App](https://github.com/509dave16/sam-tic-tac-toe "SAM Tic Tac Toe")
### [Mobile App](https://github.com/509dave16/tic-tac-toe-react-native "Tic Tac Toe React Native") (Note: Mobile App example is still very rough still)

# API

## store
A Redux Store. In the case of this package, it will represent the Model in the SAM pattern. It is highly recommended to use this in conjunction with React so that Components will automatically be re-rendered on changes to the Model.

|Ignore|Reducer|Default Value|Summary|
|:---|:---|:---|:---|
| |grid|{ cells: [], cellSets: [], sets: [], finished: false, winner: false, movesTaken: 0, initialized: false, size: 3}|Represents all aspects of a Tic Tac Toe gameboard(a.k.a grid). You need not concern yourself with 'cellSets' and 'sets', since these arrays are for computing if there is a winner or not. 'cells' and 'size' will be the most important for rendering the GUI. 'cells' is simply an array of strings which are either 'X', 'O', or '' which indicate if a player has marked the cell in the grid. 'size' indicates how big the square grid is(i.e. 3 means 3x3 which is 9 cells).|
| |gameType|""(i.e. empty string)|Should be either '', 'Local Game', 'Host Game', 'Join Game'. Represents what Game Type was selected for the Tic Tac Toe game.|
| |gameStatus|"Please select a game mode!"|A string that indicates what the player should do next or the current status of the game.|
| |player|""(i.e. empty string)|A string for the 'Host Game' or 'Join Game' game types that indicates whether the player is 'X' or 'O'.|
| |session|""(i.e. empty string)|A string for an online cross browser game that indicates what game session the player is in.|
| |showJoinSessionForm|false|A boolean for an online cross browser game that indicates if the JoinSessionForm should be displayed.|
|&#9989;|submittedSession|""(i.e. empty string)|A string representing a submitted session.|
|&#9989;|move|-1|An integer representing a cell in the grid that was clicked.|
|&#9989;|turn|""(i.e. empty string)|A string indicating which player's turn it is.|
|&#9989;|turnSwitch|false|A boolean indicating that the turn should be switched.|
|&#9989;|quit|false|A boolean indicating that the current game type should be exited.|
|&#9989;|restart|false|A boolean indicating that the current game type should be restarted.|
| |done|false|A boolean indicating that the current game is finished. Useful for determining when to show the calls to action for quiting or restarting the game.|

## actions
These functions should be used as event handlers or called from within event handlers in order to trigger the Model(a.k.a Redux Store) mutations.

- markGridAction(cellIndex): Expects cellIndex to be an integer between 0 and the length of the grid.cells array. See 'grid' property mentioned above for the 'store'.
- setGameTypeAction(gameType): Expects a string to be 'Local Game', 'Host Game', 'Join Game'. See 'gameType' property mentioned above for the 'store'.
- initiateQuitAction(): 
- initiateRestartAction(): 
- submitSessionAction(session): Expects a string that correponds to that of a another user who is hosting a Game.

# SAM Implementation Comments
This is by no means a perfect implementation of the SAM pattern. And I would highly recommend reading through the [docs](http://sam.js.org/ "SAM") to get a better understanding of the pattern before trying to read the following comments.

## State(./sam/state.js)
Each function exposed on the exported object is meant to act as a predicate that computes to either true or false based on the current Model object passed to it.
These predicate functions are suppose to bring visibility to what particular state your application(or part thereof) is in.

## Actions(./sam/actions/)
There are two kinds of actions automatic(automatic.js) and view(view.js). 
Automatic actions are suppose to be triggered by next action predicates(a.k.a NAP).
View actions are are suppose to be triggered in response to GUI events in a web browser, mobile app, desktop app, console app, etc... .
The reason the View actions are so business logic light is due to the fact that almost all of them present an intent that mutates the model such that a Automatic action is triggered.
The Automatic actions is where most of the business logic lies. We don't want the GUI to have to pass information regarding the Game Type in order for the proper business logic to execute.

## Model(./sam/model/)
Since Redux is used, I like to think of the Store/Reducers as the Model. Thus each property on the Model is a reducer. However since reducers normally respond to 'actions' which are something else in SAM,
I will be referring to them as 'intents'. Intents are used to create the proper payloads to present to the Model, which can reject or accept the payload.
All the properties of the payload directly correspond to properties(a.k.a reducers) on the Model.
Because of this all of the intent handlers that perform simple assignments for each reducer can be generated from parsing the type strings and payload objects returned from calling the intent functions.

- intent-types.js : exports object exposing strings that describe the different intent types
- intents.js : exports an object exposing all the intent functions that can be be used to present object consisting of a type and a payload to the model
- reducer-defaults.js: exports an object exposing the default values for the reducers(a.k.a Model properties)
- reducer-factory.js: exports createAssignmentReducers which given a set of reducer configs will return an object of reducers
- reducers.js: exports an object exposing the "combined" reducers that should be used to create a Redux Store

## NAP(./sam/nap.js)
In the case with this package, I chose to use State predicate functions as the next action predicates. Each State predicate function is mapped to an automatic action. Only one automatic action can be triggered per an evaluation of all the next action predicates.

