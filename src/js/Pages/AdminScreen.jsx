import React from 'react';
import { Box } from 'grommet';
import TalkingCharacter from '../Components/TalkingCharacter.jsx';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';

const AdminScreen = ({ data, send }) => {
    const render = () => {
        const currentTurn = data?.turn?.index || 0;
        switch (currentTurn) {
            case 0:
                return <p>error</p>;
            case 1:
                return (
                    <TalkingCharacter
                        dialogue={[
                            'Welcome to Magnetic Personality - the game where you and your friends collaboratively create chaotic fictional dating profiles!',
                            'To start, everyone use your device to submit a username for a dating profile.',
                            'Try creating an eye catching username like dom_top_daddy_69 or xoxoRAWR~dragon-Slayer!',
                            'Now I will patiently wait for everyone to submit a username.'
                        ]}
                    />
                );
            case 2:
                return (
                    <TalkingCharacter
                        dialogue={[
                            'Everyone submitted some very creative usernames!',
                            'The next thing these dating profiles need are profile pictures!',
                            'Everyone is going to select a profile picture for a dating profile other than the one they just named.',
                            'You will see a list of images on your device. Select one to use as the profile picture.',
                            'Now I will patiently wait for everyone to submit a profile picture.'
                        ]}
                    />
                );
            case 3:
                return (
                    <TalkingCharacter
                        dialogue={[
                            'Okay, those profile pictures are cute! Well... some of them are.',
                            'Now guess how old everyone is based on their profile pictures!'
                        ]}
                    />
                );
            case 4:
                return (
                    <>
                        <TalkingCharacter
                            dialogue={[
                                'You all made guesses. 🙄',
                                'Ooh! This next one will be fun!',
                                'Choose an occupation for this person!'
                            ]}
                        />
                    </>
                );
            case 5:
                return (
                    <TalkingCharacter
                        dialogue={[
                            'Looks like everyone has a job now! Wow, capitalism sucks!',
                            'Now decide where everyone works!'
                        ]}
                    />
                );
            case 6:
                return (
                    <>
                        <TalkingCharacter
                            dialogue={[
                                `Ooh! Let's look at the dating profiles you all just created!`,
                                `These are some really interesting choices 😏`,
                                `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
                                `But here's the catch - you'll only be able to contribute one to four words to the answer before you must pass the dating profile along to the next player for them to continue or end the response.`,
                                `Basically... just do what it says to do on your phone and we'll reconvene as a group after 😉`
                            ]}
                        />
                        <Box>
                            {data.game.players
                                .filter(player => !player.isAdmin)
                                .map(player => player?.datingProfile)
                                .map(datingProfile => (
                                    <DatingProfilePreview
                                        datingProfile={datingProfile}
                                    />
                                ))}
                        </Box>
                    </>
                );
            case 15:
                return (
                    <TalkingCharacter
                        dialogue={[
                            `These answers are so illuminating about everyone's personality!`,
                            `I feel like I'm already in love with everyone! 😍`,
                            `But alas... 😭 I don't get to match with these profiles.`,
                            'YOU DO!',
                            'Each player will match with one of these dating profiles. You will all vote to decide!',
                            'On your device, read through each dating profile and cast your vote for which player should match with them.'
                        ]}
                    />
                );
            case 16:
                return (
                    <TalkingCharacter
                        dialogue={[
                            `Okay the results are in! Everyone look at your device to see who your match is!`,
                            `Thanks for playing!`
                        ]}
                    />
                );
            default:
                return (
                    <>
                        <TalkingCharacter
                            dialogue={[
                                `Ooh! Let's look at the dating profiles you all just created!`,
                                `These are some really interesting choices 😏`,
                                `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
                                `But here's the catch - you'll only be able to contribute one to four words to the answer before you must pass the dating profile along to the next player for them to continue or end the response.`,
                                `Basically... just do what it says to do on your phone and we'll reconvene as a group after 😉`
                            ]}
                        />
                        <Box>
                            {data.game.players
                                .filter(player => !player.isAdmin)
                                .map(player => player?.datingProfile)
                                .map(datingProfile => (
                                    <DatingProfilePreview
                                        datingProfile={datingProfile}
                                    />
                                ))}
                        </Box>
                    </>
                );
        }
    };

    return render();
};

export default AdminScreen;
