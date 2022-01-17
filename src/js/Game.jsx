import React, { useState, useEffect } from 'react';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';
import { CheckBox } from 'grommet';

import Lobby from './Pages/Lobby';
import AdminScreen from './Pages/AdminScreen';
import DatingProfileCreator from './Pages/DatingProfileCreator';

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const [shouldShowDebug, setShouldShowDebug] = useState(false);

    const isInLobby = !data?.turn;
    const isAdmin = data?.player?.isAdmin;

    return (
        <>
            {isInLobby && <Lobby data={data} send={send} />}
            {!isInLobby && isAdmin && <AdminScreen data={data} send={send} />}
            {!isInLobby && !isAdmin && (
                <DatingProfileCreator data={data} send={send} />
            )}
            <CheckBox
                checked={shouldShowDebug}
                label="Show Debug State"
                onChange={event => setShouldShowDebug(event.target.checked)}
            />
            {shouldShowDebug ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : null}
        </>
    );
};

export default Game;
