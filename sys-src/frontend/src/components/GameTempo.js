/*
* https://codesandbox.io/s/0fm0sb?file=/demo.tsx
*/

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GameTempo({parentMethod}) {

    const [selectedValue, setSelectedValue] = React.useState("normal");

    function handleGameTempoChanged(event) {
        parentMethod(event);
        setSelectedValue(event.target.value);
    }
    return (
        <FormControl>
            <FormLabel>Choose a Game Tempo</FormLabel>
            <RadioGroup
                row
            >
                <FormControlLabel onChange={handleGameTempoChanged} value="slow" control={<Radio
                    checked={selectedValue === "slow"}
                    value="slow"
                />} label="Slow" />
                <FormControlLabel onChange={handleGameTempoChanged} value="normal" control={<Radio
                    checked={selectedValue === "normal"}
                    value="normal"
                />} label="Normal"/>
                <FormControlLabel onChange={handleGameTempoChanged} value="fast" control={<Radio
                    checked={selectedValue === "fast"}
                    value="fast"
                />} label="Fast" />
            </RadioGroup>
        </FormControl>
    );
}
