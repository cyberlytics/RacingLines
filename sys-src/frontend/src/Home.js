import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const Home = () => {
    //style
    const classes = useStyles();

    //Redirects to the Lobby component
    const navigate = useNavigate();
    const handleCreateGameClick = () => {
        navigate("/Lobby?room=" + uuidv4());
    };

    return (
        <div className={classes.paper}>
            <Typography variant="h1" className={classes.paper} style={{fontWeight: 'bold'}} component="h1" gutterBottom>
                Racing Lines
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateGameClick}>Create Game</Button>

        </div>
    );
}

export default Home;
