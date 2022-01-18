import React from 'react';
import { Box, Image, Paragraph, ResponsiveContext } from 'grommet';

const DatingProfilePreview = ({ datingProfile }) => {
    console.log('datingProfile: ', datingProfile);

    const size = React.useContext(ResponsiveContext);
    const isSmall = size === 'small';

    return (
        <Box
            direction={isSmall ? 'column' : 'row'}
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
                style={{
                    overflow: 'hidden',
                    marginRight: '30px'
                }}
            >
                <Image
                    fit="cover"
                    src={
                        datingProfile?.profilePic
                            ? datingProfile?.profilePic
                            : '/blank-profile-pic.png'
                    }
                />
            </Box>
            <Box flex="grow" width={isSmall ? '100%' : '60%'} pad="medium">
                <Paragraph
                    style={
                        isSmall
                            ? {
                                  fontSize: '32px',
                                  lineHeight: '32px',
                                  maxWidth: '100%',
                                  overflowWrap: 'break-word'
                              }
                            : {
                                  fontSize: '60px',
                                  lineHeight: '60px',
                                  maxWidth: '100%',
                                  overflowWrap: 'break-word'
                              }
                    }
                >
                    {datingProfile?.userName}
                    {datingProfile?.age ? `,${datingProfile?.age}` : null}
                </Paragraph>
                <Paragraph
                    style={
                        isSmall
                            ? {
                                  fontSize: '18px',
                                  lineHeight: '18px',
                                  maxWidth: '100%'
                              }
                            : {
                                  fontSize: '32px',
                                  lineHeight: '32px',
                                  maxWidth: '100%'
                              }
                    }
                >
                    This is a short introduction about me! Get to know me. Love
                    me. Become me. I am the darkness and I am the night.
                </Paragraph>
            </Box>
        </Box>
    );
};

export default DatingProfilePreview;
