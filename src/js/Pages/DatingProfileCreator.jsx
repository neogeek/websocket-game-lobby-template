import React, { useState } from 'react';
import { Box, Paragraph, Image, Select } from 'grommet';
import { Next } from 'grommet-icons';
import lodash from 'lodash';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';
import Button from '../Components/Button.jsx';
import TextInput from '../Components/TextInput.jsx';

import occupations from './Occupations.js';
import companies from './Companies.js';
import questions from './Questions.js';

const DatingProfileCreator = ({ data, send }) => {
    const currentDatingProfileId = data?.player?.currentDatingProfileId;

    const currentDatingProfile = data?.game?.players?.find(
        player => player.playerId === currentDatingProfileId
    )?.datingProfile;

    const renderWaitingForOtherPlayers = () => (
        <Paragraph
            style={{
                fontSize: '68px',
                lineHeight: '68px',
                fontWeight: 'bold',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                margin: 0
            }}
            size="xxlarge"
        >
            Waiting for other players...
        </Paragraph>
    );

    const [userName, setUsername] = useState('');
    const [isUsernameFormSubmitted, setIsUsernameFormSubmitted] =
        useState(false);

    const renderUsernameForm = () => {
        const handleClick = () => {
            send('setFields', {
                fieldNames: ['userName'],
                userName,
                setProfilePictureOptions: true,
                datingProfileId: data?.player?.playerId
            });
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
                    label="Submit"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </>
        ) : (
            renderWaitingForOtherPlayers()
        );
    };

    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [isProfilePicSubmitted, setIsProfilePicSubmitted] = useState(false);
    const renderProfilePicSelector = () => {
        console.log('currentDatingProfile: ', currentDatingProfile);

        const handleClick = () => {
            send('setFields', {
                fieldNames: ['profilePic'],
                profilePic: selectedImageUrl,
                datingProfileId: currentDatingProfileId
            });

            setIsProfilePicSubmitted(true);
        };

        return isProfilePicSubmitted ? (
            renderWaitingForOtherPlayers()
        ) : (
            <>
                <Paragraph
                    margin="medium"
                    style={{ fontSize: '24px' }}
                    size="xxlarge"
                >
                    Select a profile picture for:
                </Paragraph>
                <DatingProfilePreview
                    datingProfile={{
                        profilePic: selectedImageUrl,
                        ...currentDatingProfile
                    }}
                />
                <Box direction="row" justify="center" wrap>
                    {data?.player?.profilePictureOptions.map(imageUrl => (
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
                                borderRadius: '15px',
                                cursor: 'pointer;',
                                '&:hover': {
                                    border: '5px solid #7D4CDB;'
                                }
                            }}
                            onClick={() => setSelectedImageUrl(imageUrl)}
                        >
                            <Image
                                style={{ borderRadius: '15px' }}
                                fit="cover"
                                src={imageUrl}
                            />
                        </Box>
                    ))}
                </Box>
                <Button
                    style={{
                        position: 'fixed',
                        width: '90%',
                        bottom: '60px'
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
        );
    };

    const [age, setAge] = useState();
    const [isAgeFormSubmitted, setIsAgeFormSubmitted] = useState(false);
    const renderAgeForm = () => {
        const handleClick = () => {
            send('setFields', {
                fieldNames: ['age'],
                age,
                datingProfileId: currentDatingProfileId
            });
            setIsAgeFormSubmitted(true);
        };

        return !isAgeFormSubmitted ? (
            <Box direction="column" style={{ alignItems: 'center' }}>
                <Paragraph
                    style={{ fontSize: '24px', marginRight: 'auto' }}
                    size="xxlarge"
                >
                    How old is this person?
                </Paragraph>
                <Box
                    margin="medium"
                    animation="slideUp"
                    height="medium"
                    width="medium"
                >
                    <Image
                        style={{ borderRadius: '15px' }}
                        fit="cover"
                        src={currentDatingProfile?.profilePic}
                    />
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
            renderWaitingForOtherPlayers()
        );
    };

    const [profession, setProfession] = useState();
    const [professionOptions] = useState(lodash.sampleSize(occupations, 10));
    const [isProfessionFormSubmitted, setIsProfessionFormSubmitted] =
        useState(false);
    const renderProfessionForm = () => {
        const handleClick = () => {
            send('setFields', {
                fieldNames: ['profession', 'distance'],
                profession,
                distance: lodash.random(0, 30),
                datingProfileId: currentDatingProfileId
            });
            setIsProfessionFormSubmitted(true);
        };

        return !isProfessionFormSubmitted ? (
            <Box direction="column" style={{ alignItems: 'center' }}>
                <Paragraph
                    style={{ fontSize: '24px', marginRight: 'auto' }}
                    size="xxlarge"
                >
                    What does this person do for work?
                </Paragraph>
                <Box
                    margin="medium"
                    animation="slideUp"
                    height="medium"
                    width="medium"
                >
                    <Image
                        style={{ borderRadius: '15px' }}
                        fit="cover"
                        src={currentDatingProfile?.profilePic}
                    />
                </Box>
                <Select
                    laceholder="Job?"
                    options={professionOptions}
                    value={profession}
                    onChange={({ option }) => setProfession(option)}
                    style={{
                        fontSize: '18px',
                        padding: '25px',
                        borderRadius: '15px',
                        border: 'none',
                        width: '100%',
                        height: '100px',
                        wordWrap: 'break-word'
                    }}
                />
                <Button
                    style={{ marginTop: '30px', width: '100%' }}
                    disabled={!profession}
                    size="xxlarge"
                    primary
                    reverse
                    label="Submit"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </Box>
        ) : (
            renderWaitingForOtherPlayers()
        );
    };

    const [workplace, setWorkplace] = useState();
    const [workplaceOptions] = useState(lodash.sampleSize(companies, 10));
    const [isWorkplaceFormSubmitted, setIsWorkplaceFormSubmitted] =
        useState(false);
    const renderWorkplaceForm = () => {
        const handleClick = () => {
            send('setFields', {
                fieldNames: ['workplace', 'questions'],
                workplace,
                questions: lodash.sampleSize(questions, 3),
                datingProfileId: currentDatingProfileId
            });
            setIsWorkplaceFormSubmitted(true);
        };

        return !isWorkplaceFormSubmitted ? (
            <Box direction="column" style={{ alignItems: 'center' }}>
                <Paragraph
                    style={{ fontSize: '24px', marginRight: 'auto' }}
                    size="xxlarge"
                >
                    Where does this person work?
                </Paragraph>
                <Box
                    margin="medium"
                    animation="slideUp"
                    height="medium"
                    width="medium"
                >
                    <Image
                        style={{ borderRadius: '15px' }}
                        fit="cover"
                        src={currentDatingProfile?.profilePic}
                    />
                </Box>
                <Select
                    laceholder="Job?"
                    options={workplaceOptions}
                    value={workplace}
                    onChange={({ option }) => setWorkplace(option)}
                    style={{
                        fontSize: '18px',
                        padding: '25px',
                        borderRadius: '15px',
                        border: 'none',
                        width: '100%',
                        height: '100px',
                        wordWrap: 'break-word'
                    }}
                />
                <Button
                    style={{ marginTop: '30px', width: '100%' }}
                    disabled={!workplace}
                    size="xxlarge"
                    primary
                    reverse
                    label="Submit"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </Box>
        ) : (
            renderWaitingForOtherPlayers()
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

            send('answerQuestion', {
                datingProfileId: currentDatingProfileId,
                questionIndex,
                answerIndex,
                answer: answers[questionIndex][answerIndex]
            });
        };

        const getButtonLabel = () => {
            const numberOfWords = (currentValue?.split(' ') || []).length;

            if (!numberOfWords) {
                return `${wordCount} words remaining`;
            }
            if (numberOfWords === wordCount) {
                return 'Submit';
            }
            return `${wordCount - numberOfWords} words remaining`;
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
                                    Continue the following response as
                                </Paragraph>
                                <DatingProfilePreview
                                    datingProfile={currentDatingProfile}
                                />
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
                            style={{ marginTop: '30px' }}
                            disabled={
                                currentValue?.split(' ').length !== wordCount
                            }
                            size="xxlarge"
                            primary
                            reverse
                            label={getButtonLabel()}
                            onClick={handleClick}
                            icon={<Next />}
                        />
                    </>
                ) : (
                    renderWaitingForOtherPlayers()
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
                return renderProfessionForm();
            case 5:
                return renderWorkplaceForm();
            case 6:
                return renderAnswerForm(0, 0, 3);
            case 7:
                return renderAnswerForm(0, 1, 4);
            case 8:
                return renderAnswerForm(1, 0, 1);
            case 9:
                return renderAnswerForm(1, 1, 2);
            case 10:
                return renderAnswerForm(1, 2, 3);
            case 11:
                return renderAnswerForm(2, 0, 5);
            case 12:
                return renderAnswerForm(2, 1, 2);
            case 13:
                return renderAnswerForm(2, 2, 1);
            default:
                return <p>default</p>;
        }
    };

    return <Box pad="medium">{renderFormStep()}</Box>;
};

export default DatingProfileCreator;
