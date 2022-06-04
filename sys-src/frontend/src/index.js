import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import Container from '@material-ui/core/Container';

const colorTheme = createTheme({
    palette: {
        primary: {
            main: "#f50057"
            ,
        },
        secondary: {
            main: "#2196f3",
        },
    },
});

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={colorTheme}>
            <CssBaseline/>
            <Container maxWidth="false" disableGutters>
                <App/>
            </Container>
        </ThemeProvider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
