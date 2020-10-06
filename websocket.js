const { WebSocketGameLobbyServer } = require('websocket-game-lobby');

const websocket = ({ port, server }) => {
    const gameLobby = new WebSocketGameLobbyServer({
        port,
        server
    });
};

module.exports = websocket;
