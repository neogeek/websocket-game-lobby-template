import React from 'react';
import { Box, Image, Paragraph, ResponsiveContext } from 'grommet';
import { FaBirthdayCake, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';

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
                {datingProfile?.age ? (
                    <Box
                        style={{ marginBottom: '15px' }}
                        direction="row"
                        align="center"
                    >
                        <FaBirthdayCake
                            color="#585858"
                            style={{ margin: 0 }}
                            size={'16px'}
                        />
                        <Paragraph
                            color="secondaryText"
                            style={{ margin: '2px 0 0 6px' }}
                        >
                            {datingProfile?.age} years old
                        </Paragraph>
                    </Box>
                ) : null}
                {datingProfile.profession && datingProfile.workplace ? (
                    <Box
                        style={{ marginBottom: '15px' }}
                        direction="row"
                        align="center"
                    >
                        <FaBriefcase
                            color="#585858"
                            style={{ margin: 0 }}
                            size={'16px'}
                        />
                        <Box direction="column">
                            <Paragraph
                                color="secondaryText"
                                style={{ margin: '2px 0 0 6px' }}
                            >
                                {datingProfile.profession} at{' '}
                            </Paragraph>
                            <Paragraph
                                color="secondaryText"
                                style={{ margin: '2px 0 0 6px' }}
                            >
                                {datingProfile.workplace}
                            </Paragraph>
                        </Box>
                    </Box>
                ) : null}
                {datingProfile.distance ? (
                    <Box direction="row" align="center">
                        <FaMapMarkerAlt
                            color="#585858"
                            style={{ margin: 0 }}
                            size={'16px'}
                        />
                        <Paragraph
                            color="secondaryText"
                            style={{ margin: '2px 0 0 6px' }}
                        >
                            {datingProfile.distance === 0
                                ? 'Less than a mile away'
                                : `${datingProfile.distance} miles away`}
                        </Paragraph>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};

export default DatingProfilePreview;
