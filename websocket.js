import {
    WebSocketGameLobbyServer,
    PostgresDataStore
} from 'websocket-game-lobby';

import lodash from 'lodash';

import { getProfilePictureOptions } from './utils/GetProfilePictureOptions.js';
import {
    getNextId,
    getPlayer,
    getDatingProfile,
    everyDatingProfileHasFields
} from './utils/GameUtils.js';

const websocket = ({ port, server }) => {
    const datastore = new PostgresDataStore();

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

    gameLobby.addEventListener(
        'answerQuestion',
        async (
            {
                gameId,
                playerId,
                datingProfileId,
                questionIndex,
                answerIndex,
                answer
            },
            datastore
        ) => {
            await datastore.editGame(gameId, async game => {
                const thisDatingProfile = getDatingProfile(
                    datingProfileId,
                    game
                );
                lodash.setWith(
                    thisDatingProfile,
                    ['answers', questionIndex, answerIndex],
                    answer
                );
                return game;
            });
            const game = await datastore.findGame(gameId);

            if (
                everyDatingProfileHasFields(
                    [['answers', questionIndex, answerIndex]],
                    game
                )
            ) {
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
        }
    );

    gameLobby.addEventListener(
        'vote',
        async (
            { gameId, playerId, datingProfileId, votePlayerId },
            datastore
        ) => {
            await datastore.editGame(gameId, async game => {
                const thisDatingProfile = getDatingProfile(
                    datingProfileId,
                    game
                );
                console.log({ datingProfileId, votePlayerId });

                if (thisDatingProfile.votes) {
                    thisDatingProfile.votes = [
                        ...thisDatingProfile.votes,
                        votePlayerId
                    ];
                } else {
                    thisDatingProfile.votes = [votePlayerId];
                }

                return game;
            });

            const game = await datastore.findGame(gameId);

            console.log('game.players: ', game.players)

            const test = game.players.every(player => {
                console.log('player: ', player);
                return (
                    player.isAdmin || player.datingProfile?.votes?.length ===
                    game.players.filter(player => !player.isAdmin).length
                );
            });

            console.log('test: ', test);

            if (test) {
                await datastore.editGame(gameId, async game => {
                    game.players
                        .filter(player => !player.isAdmin)
                        .forEach(player => {
                            player.currentDatingProfileId = getNextId(
                                player.currentDatingProfileId,
                                game
                            );

                            const calculateMatch = (playerId, game) => {
                                const thisPlayer = getPlayer(playerId, game);
                                const { votes } = thisPlayer.datingProfile;

                                const frequencies = votes.map(vote => ({
                                    vote,
                                    frequency: votes.filter(
                                        thisVote => thisVote === vote
                                    )
                                }));
                                return lodash.maxBy(frequencies, 'frequency')
                                    .vote;
                            };

                            player.match = calculateMatch(
                                player.playerId,
                                game
                            );
                        });
                    return game;
                });

                await datastore.endCurrentTurn(gameId);
            }
        }
    );
};

export default websocket;
