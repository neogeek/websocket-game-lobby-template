import React, { useState, useEffect } from 'react';
import { Box } from 'grommet';

const TalkingCharacter = () => {
    return (
        <Box direction="column" align="center">
            <img
                className="character"
                height="auto"
                width="auto"
                style={{ maxWidth: '500px' }}
                src="/magnet.png"
            />
        </Box>
    );
};

export default TalkingCharacter;
