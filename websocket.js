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
                thisPlayer.datingProfile = { userName: '' };
                thisPlayer.currentDatingProfileId = playerId;
                return game;
            });
        }
    );

    gameLobby.addEventListener('setFields', async (data, datastore) => {
        const {
            gameId,
            playerId,
            datingProfileId,
            fieldNames,
            setProfilePictureOptions
        } = data;

        await datastore.editGame(gameId, async game => {
            const thisDatingProfile = getDatingProfile(datingProfileId, game);

            fieldNames.forEach(fieldName => {
                thisDatingProfile[fieldName] = data[fieldName];
            });

            if (setProfilePictureOptions) {
                const thisPlayer = getPlayer(playerId, game);
                thisPlayer.profilePictureOptions =
                    await getProfilePictureOptions();
            }

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
