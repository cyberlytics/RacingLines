/*
* https://codesandbox.io/s/0fm0sb?file=/demo.tsx
*/

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function CanvasSize({parentMethod}) {
    const [selectedValue, setSelectedValue] = React.useState("medium");

    function handleCanvasSizeChanged(event) {
        parentMethod(event);
        setSelectedValue(event.target.value);
    }

    return (
        <FormControl>
            <FormLabel>Choose a Game Size</FormLabel>
            <RadioGroup
                row
            >
                <FormControlLabel value="small" control={<Radio
                    checked={selectedValue === "small"}
                    value="small"
                />} label="Small" onChange={handleCanvasSizeChanged} />
                <FormControlLabel value="medium" control={<Radio
                    checked={selectedValue === "medium"}
                    value="medium"
                />} label="Medium" onChange={handleCanvasSizeChanged}/>
                <FormControlLabel value="large" control={<Radio
                    checked={selectedValue === "large"}
                    value="large"
                />} label="Large" onChange={handleCanvasSizeChanged}/>
            </RadioGroup>
        </FormControl>
    );
}
