import React, { useState, useEffect } from 'react';
import { Box, Button, Paragraph } from 'grommet';
import { animations, AnimateOnChange } from 'react-animation';
import { Next } from 'grommet-icons';

const TalkingCharacter = ({ dialogue }) => {
    const [index, setIndex] = useState(0);

    return (
        <Box
            width="100%"
            height="100%"
            direction="column"
            align="center"
            justify="center"
        >
            <img
                className="character"
                height="auto"
                width="auto"
                style={{
                    animation: animations.slideIn,
                    maxWidth: '500px'
                }}
                src="/magnet.png"
            />
            <Paragraph size="xxlarge" style={{ marginBottom: '24px' }}>
                <AnimateOnChange
                    animationIn="bounceIn"
                    animationOut="bounceOut"
                >
                    {dialogue[index]}
                </AnimateOnChange>
            </Paragraph>
            {dialogue[index + 1] ? (
                <Button
                    size="xxlarge"
                    primary
                    reverse
                    label="Continue"
                    onClick={() => setIndex(prev => prev + 1)}
                    icon={<Next />}
                />
            ) : null}
        </Box>
    );
};

export default TalkingCharacter;
