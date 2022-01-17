import React, { useState } from 'react';
import { Box, Paragraph, TextInput, Button } from 'grommet';
import { Next } from 'grommet-icons';

const DatingProfileCreator = ({ data, send }) => {
    const renderUsernameForm = () => {
        const [userName, setUsername] = useState('');

        return (
            <>
                <Paragraph size="xxlarge">
                    Let's start by choosing a username!
                </Paragraph>
                <TextInput
                    placeholder="username"
                    value={userName}
                    onChange={event => setUsername(event.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                <Button
                    disabled={!userName}
                    primary
                    reverse
                    label="Continue"
                    onClick={() => send('setUsername', { userName })}
                    icon={<Next />}
                />
            </>
        );
    };

    const renderProfilePicSelector = () => {
        return (
            <>
                <Paragraph size="xxlarge">
                    Let's start by choosing a username!
                </Paragraph>
                <TextInput
                    placeholder="username"
                    value={userName}
                    onChange={event => setUsername(event.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                <Button
                    disabled={!userName}
                    primary
                    reverse
                    label="Continue"
                    onClick={() => send('setUsername', { userName })}
                    icon={<Next />}
                />
            </>
        );
    };

    const renderFormStep = () => {
        const currentTurn = data?.turn?.index || 0;
        switch (currentTurn) {
            case 0:
                return <p>error</p>;
            case 1:
                return renderUsernameForm();
            case 2:
                return renderProfilePicSelector();
            default:
                return <p>default</p>;
        }
    };

    return (
        <Box direction="column">
            <Paragraph size="xxlarge">Dating Profile Creator</Paragraph>
            {renderFormStep()}
        </Box>
    );
};

export default DatingProfileCreator;
