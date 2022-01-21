import React from 'react';
import { Box, Paragraph } from 'grommet';

const PlayerList = ({ players }) => {
    return (
        <Box direction="column">
            <Paragraph style={{ fontSize: '48px', fontWeight: 'bold' }}>
                Players:
            </Paragraph>
            {players.filter(player => !player.isAdmin).map(player => (
                <Box key={player.playerId} style={{ borderRadius: '15px', color: 'white', background: 'black' }} pad="medium" margin="medium"><Paragraph style={{ fontSize: '60px', fontWeight: '800' }}>{player.name}</Paragraph></Box>
                ))}
        </Box>
    );
};

export default PlayerList;
