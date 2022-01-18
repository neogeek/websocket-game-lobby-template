import React, { useState, useEffect } from 'react';
import { Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import Game from './Game';

export const theme = deepMerge(Grommet, {
    global: {
        font: {
            family: 'IBM Plex Sans',
            size: '32px',
            height: '32px'
        }
    }
});

const App = () => {
    return (
        <Grommet theme={theme}>
            <Game />
        </Grommet>
    );
};

export default App;
