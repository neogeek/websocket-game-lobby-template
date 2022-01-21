import React from 'react';
import { Box, Image, Paragraph, ResponsiveContext } from 'grommet';
import { FaBirthdayCake, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { useWebSocketGameLobbyClient } from 'websocket-game-lobby-client-hooks';

import { DataContext } from '../Game.jsx';

const DatingProfilePreview = ({ datingProfile }) => {
    const data = React.useContext(DataContext);

    const canRenderAnswers = data.turn.index >= 15;

    console.log('canRenderAnswers: ', canRenderAnswers);

    const size = React.useContext(ResponsiveContext);
    const isSmall = size === 'small';

    return (
        <Box
            direction="column"
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
            <Box direction={isSmall ? 'column' : 'row'} align={'center'}>
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
                                      overflowWrap: 'break-word',
                                      marginTop: 0,
                                      marginBottom: '30px'
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
                                size={isSmall ? '16px' : '24px'}
                            />
                            <Paragraph
                                color="secondaryText"
                                style={isSmall ? { margin: '2px 0 0 6px' } : { margin: '2px 0 0 6px', fontSize: '24px' }}
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
                                size={isSmall ? '16px' : '24px'}
                            />
                            <Box direction={isSmall ? 'column' : 'row'}>
                                <Paragraph
                                    color="secondaryText"
                                    style={isSmall ? { margin: '2px 0 0 6px' } : { margin: '2px 0 0 6px', fontSize: '24px' }}
                                >
                                    {datingProfile.profession} at{' '}
                                </Paragraph>
                                <Paragraph
                                    color="secondaryText"
                                    style={isSmall ? { margin: '2px 0 0 6px' } : { margin: '2px 0 0 6px', fontSize: '24px' }}
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
                                size={isSmall ? '16px' : '24px'}
                            />
                            <Paragraph
                                color="secondaryText"
                                style={isSmall ? { margin: '2px 0 0 6px' } : { margin: '2px 0 0 6px', fontSize: '24px' }}
                            >
                                {datingProfile.distance === 0
                                    ? 'Less than a mile away'
                                    : `${datingProfile.distance} miles away`}
                            </Paragraph>
                        </Box>
                    ) : null}
                </Box>
            </Box>
            {canRenderAnswers &&
            datingProfile?.questions &&
            datingProfile?.answers
                ? datingProfile.questions.map((question, questionIndex) => (
                      <Box
                          key={question}
                          margin="medium"
                          pad="medium"
                          background="#EEF0EB"
                          style={{ borderRadius: '15px' }}
                      >
                          <Paragraph
                              style={
                                  isSmall
                                      ? {
                                            fontSize: '16px',
                                            fontWeight: '800'
                                        }
                                      : {
                                            fontSize: '24px',
                                            fontWeight: '800'
                                        }
                              }
                          >
                              {question}
                          </Paragraph>
                          <Paragraph
                              style={
                                  isSmall
                                      ? {
                                            maxWidth: '100%',
                                            lineHeight: '21px',
                                            fontSize: '20px',
                                            fontWeight: '400'
                                        }
                                      : {
                                            maxWidth: '100%',
                                            lineHeight: '48px',
                                            fontSize: '48px',
                                            fontWeight: '400'
                                        }
                              }
                          >
                              {(datingProfile.answers[questionIndex] || [])
                                  .map(answer => answer[0])
                                  .join(' ')}
                          </Paragraph>
                      </Box>
                  ))
                : null}
        </Box>
    );
};

export default DatingProfilePreview;
