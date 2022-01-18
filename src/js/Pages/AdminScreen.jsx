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
                    <Box
                        width="100vw"
                        height="100vh"
                        background="linear-gradient(to right, #74ebd5, #acb6e5)"
                    >
                        <TalkingCharacter
                            dialogue={[
                                'Welcome to Magnetic Personality - the game where you and your friends collaboratively create chaotic dating profiles!'
                            ]}
                        />
                    </Box>
                );
            default:
                return <p>default</p>;
        }
    };

    return render();
};

export default AdminScreen;
