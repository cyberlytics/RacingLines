import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import game from "./Game";

const useStyles = makeStyles({
    scoreboard: {
        width: '280px',
        borderRadius: 5,
        background: 'rgb(40,44,52)',
        color: 'white',
        position: 'absolute',
        left: '0',
        marginTop: '20px',
        marginLeft: '20px',
        marginBottom: '20px',
    },
    scoreHeader: {
        margin: 10,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        borderBottom: '0.1em solid white',
        paddingBottom: '0.3em',
    },
    playerScore: {
        fontSize: 20,
        background: 'rgb(40,44,52)',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        justifyContent: 'space-between',
        display: 'flex',
    },
    name: {
        display: 'inline',
    },
    score: {
        display: 'inline',
        marginLeft: '60px',
    },
});

export default function Scoreboard({ gameManager }) {
    const [players, setPlayers] = useState(gameManager.players);
    const [subscriptions, setSubscriptions] = useState(gameManager.players);
    const classes = useStyles();


    useEffect(() => {
        gameManager.subscribe(subscribe2players);
        // Subscribe each player for changes
        return () =>
            // Unsubscribe when component is destroyed
            gameManager.unsubscribe(subscribe2players);
        //eslint-disable-next-line
    }, []);

    const subscribe2players = () => {
        const newPlayers = [];
        gameManager.players.forEach((item) => {
            newPlayers.push(item);
        });
        subscriptions.forEach((player) => {
            player.unsubscribe(update);
        });
        setSubscriptions(newPlayers);

        return () =>
            // Unsubscribe when component is destroyed
            players.forEach((player) => {
                player.unsubscribe(update);
            });
    };

    useEffect(() => {
        console.log(subscriptions);
        gameManager.players.forEach((player) => {
            player.subscribe(update);
        });
        setPlayers(subscriptions);
    }, [subscriptions]);

    // Callback when values of the player has changed
    const update = (player) => {
        const newPlayers = [];

        players.forEach((item) => {
            if (item.id !== player.id) {
                newPlayers.push(item);
            }
        });
        newPlayers.push(player);
        setPlayers(newPlayers);
    };



    return (
        <>
            <div className={classes.scoreboard}>
                <h2 className={classes.scoreHeader}>S c o r e</h2>
                {players.map((player) => (
                    <div className={classes.playerScore} key={player.id} data-testid={player.id}>
                        <p className={classes.name} data-testid={player.id+"name"}>{`${player.name}: `}</p>
                        <p className={classes.score} data-testid={player.id+"score"}>{`${player.score}`}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
