import React, { useState } from 'react';
import { Box, Paragraph, Image } from 'grommet';
import { Next } from 'grommet-icons';
import lodash from 'lodash';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';
import Button from '../Components/Button.jsx';
import TextInput from '../Components/TextInput.jsx';
import UsernameForm from '../Components/UsernameForm.jsx';

import occupations from './Occupations.js';
import companies from './Companies.js';
import questions from './Questions.js';

const DatingProfileCreator = ({ data, send }) => {
    const currentDatingProfileId = data?.player?.currentDatingProfileId;
    console.log(data?.player);
    const wordCount = data?.player?.wordCount;

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
        return !isUsernameFormSubmitted ? (
            <UsernameForm data={data} send={send} setIsUsernameFormSubmitted={setIsUsernameFormSubmitted}  />
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
                            key={imageUrl}
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

    const professionOptionsData = lodash.sampleSize(occupations, 10);
    const [profession, setProfession] = useState(professionOptionsData[0]);
    const [professionOptions] = useState(professionOptionsData);
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
                <select
                    width="100%"
                    height="100%"
                    css={{
                        width: '100%',
                        height: '100px',
                        fontSize: '24px',
                        borderRadius: '15px',
                        padding: '15px',
                        border: 'none'
                    }}
                    value={profession}
                    onChange={event => setProfession(event.target.value)}
                >
                    {professionOptions.map(profession => (
                        <option key={profession} value={profession}>
                            {profession}
                        </option>
                    ))}
                </select>
                <Button
                    style={{ marginTop: '30px', width: '100%' }}
                    disabled={!profession}
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

    const companyData = lodash.sampleSize(companies, 10);
    const [workplace, setWorkplace] = useState(companyData[0]);
    const [workplaceOptions] = useState(companyData);
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
                <select
                    value={workplace}
                    onChange={event => setWorkplace(event.target.value)}
                    style={{
                        fontSize: '24px',
                        padding: '15px',
                        borderRadius: '15px',
                        border: 'none',
                        width: '100%',
                        height: '100px',
                        wordWrap: 'break-word'
                    }}
                >
                    {workplaceOptions.map(workplace => (
                        <option key={workplace} value={workplace}>
                            {workplace}
                        </option>
                    ))}
                </select>

                <Button
                    style={{ marginTop: '30px', width: '100%' }}
                    disabled={!workplace}
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

    const renderAnswerForm = (questionIndex, answerIndex) => {
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

        const numberOfWords = currentValue?.split(' ').filter(char => char).length

        const getButtonLabel = () => {

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
                                    {answerIndex === 2 ? 'finish' : 'continue'}{' '}
                                    the following response as
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
                                numberOfWords !== wordCount
                            }
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

    const [currentVotingIndex, setCurrentVotingIndex] = useState(0);
    const [votePlayerId, setVotePlayerId] = useState(
        (data?.game?.players || []).filter(player => !player.isAdmin)[0]
            .playerId
    );

    console.log('votePlayerId: ', votePlayerId);

    const renderVotingForm = () => {
        const player = (data?.game?.players || []).filter(
            player => !player.isAdmin
        )[currentVotingIndex];

        const handleClick = () => {
            setCurrentVotingIndex(prev => prev + 1);

            console.log({ datingProfileId: player.playerId, votePlayerId });

            send('vote', {
                datingProfileId: player.playerId,
                votePlayerId
            });
            window.scrollTo(0, 0)
        };

        return player ? (
            <Box direction="column">
                <DatingProfilePreview datingProfile={player?.datingProfile} />
                <Paragraph
                    style={{ fontSize: '24px', fontWeight: 400 }}
                    margin="medium"
                >
                    Who should match with {player.datingProfile.userName}?
                </Paragraph>
                <select
                    value={votePlayerId}
                    onChange={event => setVotePlayerId(event.target.value)}
                    style={{
                        fontSize: '24px',
                        padding: '15px',
                        borderRadius: '15px',
                        border: 'none',
                        width: '100%',
                        height: '100px',
                        wordWrap: 'break-word'
                    }}
                >
                    {(data?.game?.players || [])
                        .filter(player => !player.isAdmin)
                        .map(player => (
                            <option
                                key={player.playerId}
                                value={player.playerId}
                            >
                                {player.name}
                            </option>
                        ))}
                </select>
                <Button
                    style={{ marginTop: '30px', width: '100%' }}
                    disabled={false}
                    primary
                    reverse
                    label="Submit"
                    onClick={handleClick}
                    icon={<Next />}
                />
            </Box>
        ) : renderWaitingForOtherPlayers();
    };

    const renderVotingResults = () => {
        const { match } = data.player
        const matchingPlayer = data.game.players?.find(player => player.playerId === match).datingProfile

        return <Box pad="medium">
            <Paragraph style={{ fontSize: '70px', lineHeight: '100px' }}>❤️ It's a match! ❤️</Paragraph>
            <DatingProfilePreview datingProfile={matchingPlayer}/>
            <Button onClick={() => send('leave')} style={{ marginTop: '30px' }} primary label="Leave Game" />
        </Box>;
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
                return renderAnswerForm(0, 0);
            case 7:
                return renderAnswerForm(0, 1);
            case 8:
                return renderAnswerForm(0, 2);
            case 9:
                return renderAnswerForm(1, 0);
            case 10:
                return renderAnswerForm(1, 1);
            case 11:
                return renderAnswerForm(1, 2);
            case 12:
                return renderAnswerForm(2, 0);
            case 13:
                return renderAnswerForm(2, 1);
            case 14:
                return renderAnswerForm(2, 2);
            case 15:
                return renderVotingForm();
            case 16:
                return renderVotingResults();
            default:
                return <p>default</p>;
        }
    };

    return <Box pad="medium">{renderFormStep()}</Box>;
};

export default DatingProfileCreator;
