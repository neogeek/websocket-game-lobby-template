const {
    WebSocketGameLobbyServer,
    EphemeralDataStore
} = require('websocket-game-lobby');

const websocket = ({ port, server }) => {
    const datastore = new EphemeralDataStore();

    const gameLobby = new WebSocketGameLobbyServer({
        port,
        server,
        datastore
    });

    gameLobby.addEventListener(
        'join',
        async ({ gameId, playerId, playerName }, datastore) => {
            await datastore.editGame(gameId, async game => {
                const thisPlayer = game.players.find(
                    player => player.playerId === playerId
                );
                thisPlayer.name = playerName;
                return game;
            });
        }
    );
};

module.exports = websocket;