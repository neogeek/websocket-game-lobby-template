import React, { useState, useEffect } from 'react';
import { Box, Main, Heading, Paragraph } from 'grommet';

import PlayerList from '../Components/PlayerList';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';

const Lobby = ({ data, send }) => {
    const [gameCode, setGameCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        setGameCode(data?.game?.gameCode || '');
    }, [data]);

    const [isOnJoinForm, setIsOnJoinForm] = useState(false);

    const renderCreateOrJoin = () => (
        <>
            {isOnJoinForm ? (
                <>
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
                </>
            ) : (
                <Button
                    style={{
                        fontSize: '48px',
                        padding: '30px',
                        marginBottom: '24px'
                    }}
                    primary
                    label="Create New Game"
                    onClick={() => send('create')}
                />
            )}
            {isOnJoinForm ? (
                <>
                    <Button
                        style={{ fontSize: '48px', padding: '30px' }}
                        primary
                        label="Submit"
                        style={{ marginBottom: '24px' }}
                        onClick={() => send('join', { gameCode, playerName })}
                    />
                    <Button
                        style={{ fontSize: '48px', padding: '30px' }}
                        primary
                        label="Back"
                        onClick={() => setIsOnJoinForm(false)}
                    />
                </>
            ) : (
                <Button
                    style={{ fontSize: '48px', padding: '30px' }}
                    primary
                    label="Join Existing Game"
                    onClick={() => setIsOnJoinForm(true)}
                />
            )}
        </>
    );

    const renderGameCreated = () => {
        const isAdmin = data?.player.isAdmin;
        const enoughPlayers = data?.game?.players?.length >= 3;

        return (
            <>
                <Box>
                    <Paragraph style={{ fontSize: '48px' }} size="xxlarge">
                        Game Code:
                    </Paragraph>
                    <Paragraph
                        style={{
                            fontSize: '60px',
                            fontWeight: 'bold',
                            margin: '0 0 60px 0',
                            fontFamily: 'BioRhyme',
                            letterSpacing: '25px'
                        }}
                    >
                        {data.game.gameCode}
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
                                style={{ fontSize: '48px', padding: '30px' }}
                                primary
                                label="Start Game"
                                disabled={!enoughPlayers}
                                onClick={() => send('start')}
                            />
                            {!enoughPlayers ? (
                                <Paragraph
                                    size="xlarge"
                                    style={{
                                        fontSize: '48px',
                                        lineHeight: '48px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Waiting for more players to join the game...
                                </Paragraph>
                            ) : null}
                        </>
                    ) : (
                        <Paragraph
                            size="xlarge"
                            style={{
                                fontSize: '48px',
                                lineHeight: '48px',
                                fontWeight: 'bold'
                            }}
                        >
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
            {!data?.game && (
                <Box
                    direction="column"
                    border={{ color: 'brand', size: 'large' }}
                    pad="small"
                    margin="medium"
                    background="brand"
                    style={{ borderRadius: '5px' }}
                >
                    <Main align="center" pad="small">
                        <Heading
                            style={{
                                fontFamily: 'BioRhyme',
                                color: 'white'
                            }}
                            size="large"
                        >
                            Magnetic Personality
                        </Heading>
                        <Paragraph size="large">
                            The chaotic dating profile generator!
                        </Paragraph>
                    </Main>
                </Box>
            )}
            <Box
                direction="column"
                justify="center"
                margin="medium"
                flex="grow"
            >
                {!data?.game ? renderCreateOrJoin() : renderGameCreated()}
            </Box>
        </>
    );
};

export default Lobby;
