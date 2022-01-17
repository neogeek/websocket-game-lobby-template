import React, { useState, useEffect } from 'react';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';
import { Button } from 'grommet';

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const [gameCode, setGameCode] = useState('');

    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        setGameCode(data?.game?.gameCode || '');
    }, [data]);

    return (
        <>
            <div>Connection: {connected ? 'online' : 'offline'}</div>
            <div>
                <Button primary label="Create Game" onClick={() => send('create')}/>
            </div>
            <div>
                <input
                    type="text"
                    name="playerName"
                    value={playerName}
                    onChange={e => setPlayerName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    name="gameId"
                    value={gameCode}
                    onChange={e => setGameCode(e.target.value)}
                />
                <button onClick={() => send('join', { gameCode, playerName })}>
                    Join Game
                </button>
            </div>
            <div>
                <button onClick={() => send('start')}>Start Game</button>
            </div>
            <div>
                <button onClick={() => send('leave')}>Leave Game</button>
            </div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
};

export default Game
