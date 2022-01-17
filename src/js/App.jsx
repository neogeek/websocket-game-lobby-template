import React, { useState, useEffect } from 'react';
import { Grommet } from 'grommet';
import Game from './Game'

const theme = {
    global: {
        font: {
            family: 'IBM Plex Sans',
            size: '18px',
            height: '20px',
        },
    },
};

const App = () => {
    return (
            <Grommet theme={theme}>
                <Game/>
            </Grommet>
        )
}

export default App
