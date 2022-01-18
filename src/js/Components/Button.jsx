import React from 'react';
import { Button } from 'grommet';

const StyledButton = props => {
    return (
        <Button
            {...props}
            style={{ ...props.style, fontSize: '32px', padding: '25px' }}
        />
    );
};

export default StyledButton;
