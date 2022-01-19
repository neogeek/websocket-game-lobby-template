import React from 'react';
import { Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import Game from './Game';

export const theme = deepMerge(Grommet, {
    global: {
        font: {
            family: 'IBM Plex Sans',
            size: '32px',
            height: '32px'
        },
        colors: {
            secondaryText: '#585858'
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
