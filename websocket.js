const {
    WebSocketGameLobbyServer,
    EphemeralDataStore
} = require('websocket-game-lobby');

const getNextId = (currentId, players) => {
    const currentIndex = players.findIndex(
        player => player.playerId === currentId
    );
    let resultIndex = currentIndex + 1;

    if (!players[resultIndex]) {
        resultIndex = 1;
    }
    return players[resultIndex].playerId;
};

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

    gameLobby.addEventListener(
        'setUsername',
        async ({ gameId, playerId, userName }, datastore) => {
            await datastore.editGame(gameId, async game => {
                const thisPlayer = game.players.find(
                    player => player.playerId === playerId
                );
                thisPlayer.datingProfile = { userName };
                thisPlayer.currentDatingProfileId = getNextId(
                    playerId,
                    game.players
                );
                return game;
            });

            const game = await datastore.findGame(gameId);

            if (
                game.players.every(
                    player => player.isAdmin || player?.datingProfile?.userName
                )
            ) {
                await datastore.endCurrentTurn(gameId);
            }
        }
    );
};

module.exports = websocket;
