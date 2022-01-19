export const getNextId = (currentId, game) => {
    const currentIndex = game.players.findIndex(
        player => player.playerId === currentId
    );
    let resultIndex = currentIndex + 1;

    if (!game.players[resultIndex]) {
        resultIndex = 1;
    }
    return game.players[resultIndex].playerId;
};

export const getPlayer = (playerId, game) =>
    game?.players?.find(player => player.playerId === playerId);

export const getDatingProfile = (datingProfileId, game) =>
    getPlayer(datingProfileId, game)?.datingProfile;

export const everyDatingProfileHasFields = (fieldNames, game) => {
    return fieldNames.every(fieldName =>
        game.players.every(
            player => player.isAdmin || player?.datingProfile?.[fieldName]
        )
    );
};
