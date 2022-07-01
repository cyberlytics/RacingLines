import {render, screen} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import App from './App';
import Home from './Home';

describe("Test if App renders correctly", () => {
    test("Test if header 'Racing Lines' is showm", () => {
        const history = createMemoryHistory();

        render(<Router location={history.location} navigator={history}><App/></Router>);

        expect(screen.getByText(/Racing Lines/i)).toBeInTheDocument();
    })
    test("Test if url-path is correct", () => {
        const history = createMemoryHistory();
    
        render(<Router location={history.location} navigator={history}><App/></Router>);
    
        expect(global.window.location.pathname).toEqual('/');
    })

})

describe("Test if Home renders correctly", () => {
    test("Test if header 'Racing Lines' is showm", () => {
        const history = createMemoryHistory();

        render(<Router location={history.location} navigator={history}><Home/></Router>);

        expect(screen.getByText(/Racing Lines/i)).toBeInTheDocument();
    })
    test("Test if url-path is correct", () => {
        const history = createMemoryHistory();
    
        render(<Router location={history.location} navigator={history}><Home/></Router>);
    
        expect(global.window.location.pathname).toEqual('/');
    })

})

