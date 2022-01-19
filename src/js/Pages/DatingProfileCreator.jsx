import React, { useState } from 'react';
import { Box, Paragraph, Image } from 'grommet';
import { Next } from 'grommet-icons';
import lodash from 'lodash';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';
import Button from '../Components/Button.jsx';
import TextInput from '../Components/TextInput.jsx';

const DatingProfileCreator = ({ data, send }) => {
    const currentDatingProfileId = data?.player?.currentDatingProfileId;

    const currentDatingProfile = data?.game?.players?.find(
        player => player.playerId === currentDatingProfileId
    )?.datingProfile;

    const [userName, setUsername] = useState('');
    const [isUsernameFormSubmitted, setIsUsernameFormSubmitted] =
        useState(false);

    const renderUsernameForm = () => {
        const handleClick = () => {
            send('setUsername', { userName });
            setIsUsernameFormSubmitted(true);
        };

        return !isUsernameFormSubmitted ? (
            <>
                <Paragraph
                    style={{
                        fontSize: '68px',
                        lineHeight: '68px',
                        fontWeight: 'bold'
                    }}
                    size="xxlarge"
                >
                    Choose a username!
                </Paragraph>
                <TextInput
                    placeholder="username"
                    value={userName}
                    onChange={event => setUsername(event.target.value)}
                    style={{
                        marginBottom: '24px',
                        fontSize: '48px',
                        padding: '30px',
                        borderRadius: '15px',
                        border: 'none',
                        backgroundColor: 'white'
                    }}
                />
                <Button
                    style={{ fontSize: '48px', padding: '30px' }}
                    size="xxlarge"
                    disabled={!userName}
                    primary
                    reverse
                    label="Continue"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </>
        ) : (
            <>
                <DatingProfilePreview datingProfile={{ userName }} />
                <Paragraph
                    style={{
                        fontSize: '68px',
                        lineHeight: '68px',
                        fontWeight: 'bold'
                    }}
                    size="xxlarge"
                >
                    Waiting for other players...
                </Paragraph>
            </>
        );
    };

    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [isProfilePicSubmitted, setIsProfilePicSubmitted] = useState(false);
    const renderProfilePicSelector = () => {
        const handleClick = () => {
            send('setField', {
                fieldName: 'profilePic',
                profilePic: selectedImageUrl,
                datingProfileId: currentDatingProfileId
            });

            setIsProfilePicSubmitted(true);
        };

        return (
            <>
                <Paragraph size="xxlarge">
                    Select a profile picture for this dating profile:
                </Paragraph>
                <DatingProfilePreview
                    datingProfile={{
                        ...currentDatingProfile,
                        profilePic: selectedImageUrl
                    }}
                />
                {isProfilePicSubmitted ? (
                    <>
                        <Paragraph
                            size="xxlarge"
                            style={{
                                fontSize: '68px',
                                lineHeight: '68px',
                                fontWeight: 'bold'
                            }}
                        >
                            Waiting for other players...
                        </Paragraph>
                    </>
                ) : (
                    <>
                        <Box direction="row" justify="center" wrap>
                            {data?.player?.profilePictureOptions.map(
                                imageUrl => (
                                    <Box
                                        margin="medium"
                                        animation="slideUp"
                                        height="small"
                                        width="small"
                                        border={
                                            imageUrl === selectedImageUrl && {
                                                color: 'brand',
                                                size: 'large'
                                            }
                                        }
                                        css={{
                                            cursor: 'pointer;',
                                            '&:hover': {
                                                border: '5px solid #7D4CDB;'
                                            }
                                        }}
                                        onClick={() =>
                                            setSelectedImageUrl(imageUrl)
                                        }
                                    >
                                        <Image fit="cover" src={imageUrl} />
                                    </Box>
                                )
                            )}
                        </Box>
                        <Button
                            style={{
                                position: 'fixed',
                                width: '90%',
                                bottom: '100px'
                            }}
                            size="xxlarge"
                            disabled={!selectedImageUrl}
                            primary
                            reverse
                            label="Submit"
                            onClick={handleClick}
                            icon={<Next />}
                        />
                    </>
                )}
            </>
        );
    };

    const [age, setAge] = useState();
    const [isAgeFormSubmitted, setIsAgeFormSubmitted] = useState(false);
    const renderAgeForm = () => {
        const handleClick = () => {
            send('setField', {
                fieldName: 'age',
                age,
                datingProfileId: currentDatingProfileId
            });
            setIsAgeFormSubmitted(true);
        };

        return !isAgeFormSubmitted ? (
            <Box direction="column" style={{ alignItems: 'center' }}>
                <Paragraph size="xxlarge">How old is this person?</Paragraph>
                <Box
                    margin="medium"
                    animation="slideUp"
                    height="small"
                    width="small"
                >
                    <Image fit="cover" src={currentDatingProfile?.profilePic} />
                </Box>
                <TextInput
                    type="number"
                    placeholder="How old?"
                    value={age}
                    onChange={event => setAge(event.target.value)}
                    style={{ marginBottom: '24px' }}
                />
                <Button
                    disabled={!age}
                    size="xxlarge"
                    primary
                    reverse
                    label="Submit"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </Box>
        ) : (
            <Paragraph
                size="xxlarge"
                style={{
                    fontSize: '68px',
                    lineHeight: '68px',
                    fontWeight: 'bold'
                }}
            >
                Waiting for other players...
            </Paragraph>
        );
    };

    const [answers, setAnswers] = useState({});

    const setQuestionAnswer = (questionIndex, answerIndex, answer) => {
        const result = { ...answers };

        if (result[questionIndex]) {
            result[questionIndex][answerIndex] = [answer];
        } else {
            result[questionIndex] = {
                [answerIndex]: [answer]
            };
        }

        setAnswers(result);
    };

    const setAnswerSubmitted = (questionIndex, answerIndex) => {
        const result = { ...answers };
        const answer = result[questionIndex][answerIndex][0];
        result[questionIndex][answerIndex] = [answer, true];
        setAnswers(result);
    };

    const renderAnswerForm = (questionIndex, answerIndex, wordCount) => {
        const currentValue = lodash.get(answers, [
            questionIndex,
            answerIndex,
            0
        ]);

        const isAnswerSubmitted = lodash.get(answers, [
            questionIndex,
            answerIndex,
            1
        ]);

        const handleClick = () => {
            setAnswerSubmitted(questionIndex, answerIndex);
        };

        return (
            <>
                {!isAnswerSubmitted ? (
                    <>
                        {answerIndex === 0 ? (
                            <>
                                <Paragraph size="xxlarge">
                                    Respond to the following prompt as
                                </Paragraph>
                                <DatingProfilePreview
                                    datingProfile={currentDatingProfile}
                                />
                                <Paragraph size="xxlarge">
                                    {
                                        currentDatingProfile.questions[
                                            questionIndex
                                        ]
                                    }
                                </Paragraph>
                            </>
                        ) : (
                            <>
                                <Paragraph size="xxlarge">
                                    Continue the following response
                                </Paragraph>
                                <Paragraph size="xxlarge">
                                    {
                                        currentDatingProfile.answers[
                                            questionIndex
                                        ][answerIndex - 1]
                                    }
                                </Paragraph>
                            </>
                        )}
                        <TextInput
                            value={currentValue}
                            onChange={event =>
                                setQuestionAnswer(
                                    questionIndex,
                                    answerIndex,
                                    event.target.value
                                )
                            }
                            placeholder="..."
                        />
                        <Button
                            disabled={
                                currentValue?.split(' ').length !== wordCount
                            }
                            size="xxlarge"
                            primary
                            reverse
                            label="Submit"
                            onClick={handleClick}
                            icon={<Next />}
                        />
                    </>
                ) : (
                    <>
                        <Paragraph size="xxlarge">You submitted:</Paragraph>
                        <Paragraph size="xxlarge">{currentValue}</Paragraph>
                    </>
                )}
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
            case 3:
                return renderAgeForm();
            case 4:
                return renderAnswerForm(0, 0, 1);
            case 5:
                return renderAnswerForm(0, 1, 3);
            default:
                return <p>default</p>;
        }
    };

    return <Box pad="medium">{renderFormStep()}</Box>;
};

export default DatingProfileCreator;
