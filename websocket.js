import {
    WebSocketGameLobbyServer,
    EphemeralDataStore
} from 'websocket-game-lobby';

import { getProfilePictureOptions } from './utils/GetProfilePictureOptions.js';
import {
    getNextId,
    getPlayer,
    getDatingProfile,
    everyDatingProfileHasFields
} from './utils/GameUtils.js';

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
                const thisPlayer = getPlayer(playerId, game);
                thisPlayer.name = playerName;
                return game;
            });
        }
    );

    gameLobby.addEventListener(
        'setUsername',
        async ({ gameId, playerId, userName }, datastore) => {
            await datastore.editGame(gameId, async game => {
                const thisPlayer = getPlayer(playerId, game);
                thisPlayer.datingProfile = {
                    userName,
                    questions: [
                        "I'm secretly good at...",
                        'The best way to ask me out is to...',
                        'You should leave a comment if...'
                    ],
                    answers: []
                };

                thisPlayer.currentDatingProfileId = getNextId(playerId, game);

                thisPlayer.profilePictureOptions =
                    await getProfilePictureOptions();

                return game;
            });

            const game = await datastore.findGame(gameId);

            if (everyDatingProfileHasFields(['userName'], game)) {
                await datastore.endCurrentTurn(gameId);
            }
        }
    );

    gameLobby.addEventListener('setFields', async (data, datastore) => {
        const { gameId, datingProfileId, fieldNames } = data;

        await datastore.editGame(gameId, async game => {
            const thisDatingProfile = getDatingProfile(datingProfileId, game);

            fieldNames.forEach(fieldName => {
                thisDatingProfile[fieldName] = data[fieldName];
            });
            return game;
        });

        const game = await datastore.findGame(gameId);

        if (everyDatingProfileHasFields(fieldNames, game)) {
            await datastore.editGame(gameId, async game => {
                game.players.forEach(player => {
                    player.currentDatingProfileId = getNextId(
                        player.currentDatingProfileId,
                        game
                    );
                });
                return game;
            });

            await datastore.endCurrentTurn(gameId);
        }
    });
};

export default websocket;
