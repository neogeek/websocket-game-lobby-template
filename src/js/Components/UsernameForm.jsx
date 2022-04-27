import React, { useState } from 'react';
import { Paragraph } from 'grommet';
import { Next } from 'grommet-icons';
import Button from '../Components/Button.jsx';
import TextInput from '../Components/TextInput.jsx';

const UsernameForm = ({ data, send, setIsUsernameFormSubmitted}) => {
  const [userName, setUsername] = useState('');

  const handleClick = () => {
    send('setFields', {
        fieldNames: ['userName'],
        userName,
        setProfilePictureOptions: true,
        datingProfileId: data?.player?.playerId
    });
    setIsUsernameFormSubmitted(true);
  };

  return (
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
          disabled={!userName}
          primary
          reverse
          label="Submit"
          onClick={handleClick}
          icon={<Next />}
      />
    </>);
};

export default UsernameForm;
