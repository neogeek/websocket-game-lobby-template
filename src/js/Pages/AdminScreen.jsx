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
                            'Okay, those profile pics are cute! Well... some of them are.',
                            'Now guess how old everyone is based on their profile pic!'
                        ]}
                    />
                );
            case 4:
                return (
                    <>
                        <TalkingCharacter dialogue={['poo poo!']} />
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
            default:
                return <p>default</p>;
        }
    };

    return render();
};

export default AdminScreen;
