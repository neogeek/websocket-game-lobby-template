import React from 'react';
import { Box, Image, Paragraph, ResponsiveContext } from 'grommet';

const DatingProfilePreview = ({ datingProfile }) => {
    console.log('datingProfile: ', datingProfile);

    const size = React.useContext(ResponsiveContext);
    const isSmall = size === 'small';

    return (
        <Box
            direction={isSmall ? 'column' : 'row'}
            align={'center'}
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
                height="280px"
                width="280px"
                style={
                    isSmall
                        ? {
                              overflow: 'hidden',
                              marginRight: '0'
                          }
                        : {
                              overflow: 'hidden',
                              marginRight: '30px'
                          }
                }
            >
                <Image
                    style={{ borderRadius: '15px' }}
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
                                  fontSize: '24px',
                                  lineHeight: '24px',
                                  fontWeight: '600',
                                  maxWidth: '100%',
                                  overflowWrap: 'break-word',
                                  marginTop: '0'
                              }
                            : {
                                  fontSize: '60px',
                                  lineHeight: '60px',
                                  fontWeight: '700',
                                  maxWidth: '100%',
                                  overflowWrap: 'break-word'
                              }
                    }
                >
                    {datingProfile?.userName}
                </Paragraph>
            </Box>
        </Box>
    );
};

export default DatingProfilePreview;
