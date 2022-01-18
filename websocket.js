import {
    WebSocketGameLobbyServer,
    EphemeralDataStore
} from 'websocket-game-lobby';

import { getProfilePictureOptions } from './utils/GetProfilePictureOptions.js';
import {
    getNextId,
    getPlayer,
    getDatingProfile,
    everyDatingProfileHasField
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
                thisPlayer.datingProfile = { userName };

                thisPlayer.currentDatingProfileId = getNextId(playerId, game);

                thisPlayer.profilePictureOptions =
                    await getProfilePictureOptions();

                return game;
            });

            const game = await datastore.findGame(gameId);

            if (everyDatingProfileHasField('userName', game)) {
                await datastore.endCurrentTurn(gameId);
            }
        }
    );

    gameLobby.addEventListener('setField', async (data, datastore) => {
        const { gameId, playerId, datingProfileId, fieldName } = data;
        const value = data[fieldName];

        await datastore.editGame(gameId, async game => {
            const thisPlayer = getPlayer(playerId, game);
            thisPlayer.currentDatingProfileId = getNextId(
                datingProfileId,
                game
            );

            const thisDatingProfile = getDatingProfile(datingProfileId, game);
            thisDatingProfile[fieldName] = value;

            return game;
        });

        const game = await datastore.findGame(gameId);

        if (everyDatingProfileHasField(fieldName, game)) {
            await datastore.endCurrentTurn(gameId);
        }
    });
};

export default websocket;
