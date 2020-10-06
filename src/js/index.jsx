import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';

const Game = () => {
    const { data, connected, send } = useWebSocketGameLobbyClient({
        port: process.env.NODE_ENV === 'development' ? 5000 : undefined
    });

    const [gameCode, setGameCode] = useState('');

    useEffect(() => {
        setGameCode(data?.game?.gameCode || '');
    }, [data]);

    return (
        <>
            <div>Connection: {connected ? 'online' : 'offline'}</div>
            <div>
                <button onClick={() => send('create')}>Create Game</button>
            </div>
            <div>
                <input
                    type="text"
                    name="gameId"
                    value={gameCode}
                    onChange={e => setGameCode(e.target.value)}
                />
                <button onClick={() => send('join', { gameCode })}>
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

ReactDOM.render(<Game />, document.querySelector('#root'));
