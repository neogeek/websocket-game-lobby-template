import React from 'react';
import TalkingCharacter from '../Components/TalkingCharacter.jsx';
import { Box } from 'grommet';

const AdminScreen = ({ data, send }) => {
    const render = () => {
        const currentTurn = data?.turn?.index || 0;
        switch (currentTurn) {
            case 0:
                return <p>error</p>;
            case 1:
                return (
                    <TalkingCharacter
                        dialogue={[
                            'Welcome to Magnetic Personality - the game where you and your friends collaboratively create chaotic fictional dating profiles!',
                            'To start, everyone use your device to submit a username for a dating profile.',
                            'Try creating an eye catching username like dom_top_daddy_69 or xoxoRAWR~dragon-Slayer!',
                            'Now I will patiently wait for everyone to submit their username.'
                        ]}
                    />
                );
            default:
                return <p>default</p>;
        }
    };

    return (
        <Box
            width="100vw"
            height="100vh"
            background="linear-gradient(to right, #74ebd5, #acb6e5)"
        >
            {render()}
        </Box>
    );
};

export default AdminScreen;
