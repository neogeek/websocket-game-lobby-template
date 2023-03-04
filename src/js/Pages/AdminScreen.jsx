import React from 'react';
import { Box, Layer } from 'grommet';
import TalkingCharacter from '../Components/TalkingCharacter.jsx';
import DatingProfilePreview from '../Components/DatingProfilePreview.jsx';

import Button from '../Components/Button.jsx'

const AdminScreen = ({ data, send }) => {
    const switchDialogue = (currentTurn) => {
      switch (currentTurn) {
        case 1:
          return [
            'Welcome to Magnetic Personality - the game where you and your friends collaboratively create chaotic fictional dating profiles!',
            'To start, everyone use your device to submit a username for a dating profile.',
            'Try creating an eye catching username like dom_top_daddy_69 or xoxoRAWR~dragon-Slayer!',
            'Now I will patiently wait for everyone to submit a username.'
          ]
        case 2:
          return [
            'Everyone submitted some very creative usernames!',
            'The next thing these dating profiles need are profile pictures!',
            'Everyone is going to select a profile picture for a dating profile other than the one they just named.',
            'You will see a list of images on your device. Select one to use as the profile picture.',
            'Now I will patiently wait for everyone to submit a profile picture.'
        ]
        case 3:
          return [
            'Okay, those profile pictures are cute! Well... some of them are.',
            'Now guess how old everyone is based on their profile pictures!'
          ]
        case 4:
          return [
            'You all made guesses. 🙄',
            'Ooh! This next one will be fun!',
            'Choose an occupation for this person!'
          ]
        case 5:
          return [
            'Looks like everyone has a job now! Wow, capitalism sucks!',
            'Now decide where everyone works!'
          ]
        case 6:
          return [
            `Ooh! Let's look at the dating profiles you all just created!`,
            `These are some really interesting choices 😏`,
            `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
            `But here's the catch - you'll only be able to contribute one to four words to the answer before you must pass the dating profile along to the next player for them to continue or end the response.`,
            `Basically... just do what it says to do on your phone and we'll reconvene as a group after 😉`
          ]
        case 15:
          return  [
            `These answers are so illuminating about everyone's personality!`,
            `I feel like I'm already in love with everyone! 😍`,
            `But alas... 😭 I don't get to match with these profiles.`,
            'YOU DO!',
            'Each player will match with one of these dating profiles. You will all vote to decide!',
            'On your device, read through each dating profile and cast your vote for which player should match with them.'
          ]
        case 16:
          return [
            `Okay the results are in! Everyone look at your device to see who your match is!`,
            `Thanks for playing!`
          ]
        default:
          return [
            `Ooh! Let's look at the dating profiles you all just created!`,
            `These are some really interesting choices 😏`,
            `Okay so the next thing we are gonna do is answer questions as these dating profiles.`,
            `But here's the catch - you'll only be able to contribute one to four words to the answer before you must pass the dating profile along to the next player for them to continue or end the response.`,
            `Basically... just do what it says to do on your phone and we'll reconvene as a group after 😉`
          ]
        }
    };
    const renderTalkingCharacter = (currentTurn) => {
      return (
        <TalkingCharacter
            send={send}
            dialogue={switchDialogue(currentTurn)}
        />
      );
    };
    const renderCompletedPlayers = (completedPlayers) => {
      if (completedPlayers.length > 0) {
        return (
          <Layer modal={false} plain={true} position="left">
            <div class="completed-players">
              <p>
                {completedPlayers.join("<br/>")}
              </p>
            </div>
          </Layer>
        )
      }
    }
    const renderDatingProfiles = (currentTurn, players) => {
      if (currentTurn > 5 && currentTurn < 15) {
        return (
          <Box>
            {players
              .filter(player => !player.isAdmin)
              .map(player => player?.datingProfile)
              .map(datingProfile => (
                <DatingProfilePreview
                    datingProfile={datingProfile}
                />
            ))}
          </Box>
        );
      }
    };
    const renderLeaveButton = (currentTurn)  => {
      if (currentTurn === 16) {
        return (
          <Button onClick={() => send('leave')} margin="medium" style={{ marginTop: '30px' }} primary label="Leave Game" />
        );
      }
    }
    const render = () => {
        const currentTurn = data?.turn?.index || 0;
        const completePlayerNames = data.game.players
                                      .filter(player => !player.isAdmin)
                                      .filter(player => player.curentTurnComplete)
                                      .map(player => player?.name);

        if (currentTurn == 0) {
          return (<p>error</p>);
        } else {
          return (
            <>
              {renderTalkingCharacter(currentTurn)};
              {renderDatingProfiles(currentTurn, data.game.players)}
              {renderCompletedPlayers(completePlayerNames)}
              {renderLeaveButton(currentTurn)}
            </>
          );
        }
    };
    return render();
};

export default AdminScreen;
