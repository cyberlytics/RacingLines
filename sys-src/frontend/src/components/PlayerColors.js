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


export default function PlayerColors({parentMethod}) {
    
    const [selectedValue, setSelectedValue] = React.useState("green");

    function handleClientColorChanged(event){
      parentMethod(event);
      setSelectedValue(event.target.value);
    }
    return (
        <FormControl>
            <FormLabel>Choose your color</FormLabel>
            <RadioGroup
                row
            >
                <FormControlLabel onChange={handleClientColorChanged} value="red" control={<RedRadio
                    checked={selectedValue === "red"}
                    value="red"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "A" }}
                /> } label="Red" />
                <FormControlLabel onChange={handleClientColorChanged} value="orange" control={<OrangeRadio
                    checked={selectedValue === "orange"}
                    value="orange"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "B" }}
                />} label="Orange" />
                <FormControlLabel onChange={handleClientColorChanged} value="yellow" control={<YellowRadio
                    checked={selectedValue === "yellow"}
                    value="yellow"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "C" }}
                />} label="Yellow" />
                <FormControlLabel  onChange={handleClientColorChanged} value="green" control={ <GreenRadio
                    checked={selectedValue === "green"}
                    value="green"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "D" }}
                />} label="Green" />
                <FormControlLabel onChange={handleClientColorChanged} value="blue" control={<BlueRadio
                    checked={selectedValue === "blue"}
                    value="blue"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "E" }}
                />} label="Blue" />
                <FormControlLabel onChange={handleClientColorChanged} value="purple" control={<PurpleRadio
                    checked={selectedValue === "purple"}
                    value="purple"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "F" }}
                />} label="Purple" />
                <FormControlLabel onChange={handleClientColorChanged} value="pink" control={<PinkRadio
                    checked={selectedValue === "pink"}
                    value="pink"
                    //name="radio-button-demo"
                    //inputProps={{ "aria-label": "G" }}
                />} label="Pink" />                
            </RadioGroup>
        </FormControl>
    );
}