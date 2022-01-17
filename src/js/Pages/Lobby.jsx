import React, { useState, useEffect } from 'react';
import { Box, Main, Heading, Paragraph, TextInput, Button } from 'grommet';

import PlayerList from '../Components/PlayerList';

const Lobby = ({ data, send }) => {
    const [gameCode, setGameCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        setGameCode(data?.game?.gameCode || '');
    }, [data]);

    const renderCreateOrJoin = () => (
        <>
            <Button
                primary
                label="Create New Game"
                onClick={() => send('create')}
                style={{ marginBottom: '24px' }}
            />
            <Paragraph size="xlarge">Or</Paragraph>
            <TextInput
                style={{ marginBottom: '24px' }}
                placeholder="Game Code"
                value={gameCode}
                onChange={e => setGameCode(e.target.value)}
            />
            <TextInput
                style={{ marginBottom: '24px' }}
                placeholder="Your Name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
            />
            <Button
                primary
                label="Join Existing Game"
                onClick={() => send('join', { gameCode, playerName })}
            />
        </>
    );

    const renderGameCreated = () => {
        const isAdmin = data?.player.isAdmin;
        const enoughPlayers = data?.game?.players?.length >= 3;

        return (
            <>
                <Box>
                    <Paragraph size="large">
                        Game Code: {data.game.gameCode}
                    </Paragraph>
                    <Button
                        primary
                        label="Leave Game"
                        onClick={() => send('leave')}
                        style={{ marginBottom: '24px' }}
                    />
                    {isAdmin ? (
                        <>
                            <Button
                                primary
                                label="Start Game"
                                disabled={!enoughPlayers}
                                onClick={() => send('start')}
                            />
                            {!enoughPlayers ? (
                                <Paragraph size="xlarge">
                                    Waiting for more players to join the game...
                                </Paragraph>
                            ) : null}
                        </>
                    ) : (
                        <Paragraph size="xlarge">
                            Waiting for admin to start game...
                        </Paragraph>
                    )}
                    <PlayerList players={data?.game?.players} />
                </Box>
            </>
        );
    };

    return (
        <>
            <Box
                direction="column"
                border={{ color: 'brand', size: 'large' }}
                pad="medium"
                margin="medium"
                style={{ marginBottom: '120px' }}
            >
                <Main align="center" pad="small">
                    <Heading size="medium">Magnetic Personality</Heading>
                    <Paragraph size="large">
                        The chaotic dating profile generator!
                    </Paragraph>
                </Main>
            </Box>
            <Box direction="column" margin="medium">
                {!data?.game ? renderCreateOrJoin() : renderGameCreated()}
            </Box>
        </>
    );
};

export default Lobby;
