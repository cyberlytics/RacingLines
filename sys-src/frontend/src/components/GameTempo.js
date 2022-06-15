/*
* https://codesandbox.io/s/0fm0sb?file=/demo.tsx
*/

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function DifficultyLevel() {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Choose a Game Tempo</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="easy" control={<Radio />} label="Slow" />
                <FormControlLabel value="normal" control={<Radio />} label="Medium" />
                <FormControlLabel value="hard" control={<Radio />} label="Fast" />
            </RadioGroup>
        </FormControl>
    );
}
