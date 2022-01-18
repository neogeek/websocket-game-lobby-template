import React from 'react';
import { Box, Paragraph, List } from 'grommet';

const PlayerList = ({ players }) => {
    return (
        <Box direction="column">
            <Paragraph style={{ fontSize: '48px', fontWeight: 'bold' }}>
                Players:
            </Paragraph>
            <List
                primaryKey="name"
                data={players.filter(player => !player.isAdmin)}
            />
        </Box>
    );
};

export default PlayerList;
