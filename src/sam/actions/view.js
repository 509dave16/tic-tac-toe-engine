import intents from '../model/intents.js';

const createActions = present => ({
    markGridAction: cellIndex => present(intents.initiateMarkGrid(cellIndex)),
    setGameTypeAction: gameType => present(intents.setGameType(gameType)),
    initiateQuitAction: () => present(intents.initiateQuit()),
    initiateRestartAction: present => present(intents.initiateRestart()),
    submitSessionAction: submittedSession => present(intents.submitSession(submittedSession))
});

export default createActions;
