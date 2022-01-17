import React, { useState, useEffect } from 'react';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';
import { CheckBox } from 'grommet';

import Lobby from './Pages/Lobby';

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const [shouldShowDebug, setShouldShowDebug] = useState(false);

    const isInLobby = !data?.turn;

    return (
        <>
            {isInLobby && <Lobby data={data} send={send} />}
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
