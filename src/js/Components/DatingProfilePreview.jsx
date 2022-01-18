import React from 'react';
import { Box, Image, Paragraph } from 'grommet';

const DatingProfilePreview = ({ datingProfile }) => {
    console.log('datingProfile: ', datingProfile);

    return (
        <Box
            direction="row"
            animation="slideUp"
            margin="medium"
            pad="medium"
            style={{
                minHeight: '375px',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
        >
            <Box
                margin="small"
                height="300px"
                width="300px"
                style={{ overflow: 'hidden', marginRight: '30px' }}
            >
                <Image fit="cover" src={datingProfile.profilePic} />
            </Box>
            <Box flex="grow" width="60%" pad="medium">
                <Paragraph style={{ fontSize: '60px', maxWidth: '100%' }}>
                    {datingProfile.userName}, {datingProfile.age}
                </Paragraph>
                <Paragraph
                    style={{
                        fontSize: '32px',
                        lineHeight: '32px',
                        maxWidth: '100%'
                    }}
                >
                    This is a short introduction about me! Get to know me. Love
                    me. Become me. I am the darkness and I am the night.
                </Paragraph>
            </Box>
        </Box>
    );
};

export default DatingProfilePreview;
