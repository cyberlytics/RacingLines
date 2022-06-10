// import React from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// export default function PlayerColors() {
//     return (
//         <FormControl>
//             <FormLabel id="player-colors-radio-buttons-group-label">Choose your color</FormLabel>
//             <RadioGroup
//                 row
//                 aria-labelledby="player-colors-radio-buttons-group-label"
//                 name="player-colors-radio-buttons-group"
//             >
//                 <FormControlLabel value="red" control={<Radio /> } label="Red" />
//                 <FormControlLabel value="orange" control={<Radio />} label="Orange" />
//                 <FormControlLabel value="yellow" control={<Radio />} label="Yellow" />
//                 <FormControlLabel value="green" control={<Radio />} label="Green" />
//                 <FormControlLabel value="blue" control={<Radio />} label="Blue" />
//                 <FormControlLabel value="purple" control={<Radio />} label="Purple" />
//                 <FormControlLabel value="pink" control={<Radio />} label="Pink" />                
//             </RadioGroup>
//         </FormControl>
//     );
// }

import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { orange } from "@material-ui/core/colors";
import { yellow } from "@material-ui/core/colors";
import { green } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { purple } from "@material-ui/core/colors";
import { pink } from "@material-ui/core/colors";

// https://codesandbox.io/s/material-demo-forked-wpf0d?file=/demo.js:958-1145
const RedRadio = withStyles({
    root: {
      color: red[400],
      "&$checked": {
        color: red[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const OrangeRadio = withStyles({
    root: {
      color: orange[400],
      "&$checked": {
        color: orange[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const YellowRadio = withStyles({
    root: {
      color: yellow[400],
      "&$checked": {
        color: yellow[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const BlueRadio = withStyles({
    root: {
      color: blue[400],
      "&$checked": {
        color: blue[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const PurpleRadio = withStyles({
    root: {
      color: purple[400],
      "&$checked": {
        color: purple[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);

  const PinkRadio = withStyles({
    root: {
      color: pink[400],
      "&$checked": {
        color: pink[600]
      }
    },
    checked: {}
  })((props) => <Radio color="default" {...props} />);


export default function PlayerColors() {
    return (
        <FormControl>
            <FormLabel id="player-colors-radio-buttons-group-label">Choose your color</FormLabel>
            <RadioGroup
                row
                aria-labelledby="player-colors-radio-buttons-group-label"
                name="player-colors-radio-buttons-group"
            >
                <FormControlLabel value="red" control={<RedRadio
                    value="a"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "A" }}
                /> } label="Red" />
                <FormControlLabel value="orange" control={<OrangeRadio
                    value="b"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "B" }}
                />} label="Orange" />
                <FormControlLabel value="yellow" control={<YellowRadio
                    value="c"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "C" }}
                />} label="Yellow" />
                <FormControlLabel value="green" control={ <GreenRadio
                    value="d"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "D" }}
                />} label="Green" />
                <FormControlLabel value="blue" control={<BlueRadio
                    value="e"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "E" }}
                />} label="Blue" />
                <FormControlLabel value="purple" control={<PurpleRadio
                    value="f"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "F" }}
                />} label="Purple" />
                <FormControlLabel value="pink" control={<PinkRadio
                    value="g"
                    name="radio-button-demo"
                    inputProps={{ "aria-label": "G" }}
                />} label="Pink" />                
            </RadioGroup>
        </FormControl>
    );
}