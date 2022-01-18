import React, { useState, useEffect, useCallback } from 'react';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';
import { Box } from 'grommet';

import Lobby from './Pages/Lobby';
import AdminScreen from './Pages/AdminScreen';
import DatingProfileCreator from './Pages/DatingProfileCreator';

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const [shouldShowDebug, setShouldShowDebug] = useState(false);

    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;
        if (keyCode === 192) {
            setShouldShowDebug(prev => !prev);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const isInLobby = !data?.turn;
    const isAdmin = data?.player?.isAdmin;

    return (
        <Box
            width="100vw"
            height="100vh"
            background="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
        >
            {isInLobby && <Lobby data={data} send={send} />}
            {!isInLobby && isAdmin && <AdminScreen data={data} send={send} />}
            {!isInLobby && !isAdmin && (
                <DatingProfileCreator data={data} send={send} />
            )}
            {shouldShowDebug ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : null}
        </Box>
    );
};

export default Game;
