import React, { useState, useEffect, useCallback } from 'react';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';
import { Box } from 'grommet';

import Lobby from './Pages/Lobby';
import AdminScreen from './Pages/AdminScreen';
import DatingProfileCreator from './Pages/DatingProfileCreator';

export const DataContext = React.createContext();

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const handleUserKeyPress = useCallback(event => {
        const { keyCode } = event;
        if (keyCode === 192) {
            // Useful for debug
            console.log('data: ', data)
        }
    }, [data]);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const isInLobby = !data?.turn;
    const isAdmin = data?.player?.isAdmin;

    return (
        <DataContext.Provider value={data}>
            <Box
                style={{
                    minWidth: '100vw',
                    minHeight: '100vh',
                    background:
                        'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
                }}
            >
                {isInLobby && <Lobby data={data} send={send} />}
                {!isInLobby && isAdmin && (
                    <AdminScreen data={data} send={send} />
                )}
                {!isInLobby && !isAdmin && (
                    <DatingProfileCreator data={data} send={send} />
                )}
            </Box>
        </DataContext.Provider>
    );
};

export default Game;
