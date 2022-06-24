import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    scoreboard: {
        width: '20%',
        border: '2px solid black',
        borderRadius: 10,
        background: '#f50057',
        fontWeight: 'bold',
    },
    scoreHeader: {
        margin: 10,
        fontSize: 25,
        textAlign: 'center',
        textDecoration: 'underline',
    },
    playerScore: {
        fontSize: 16,
        margin: 10,
        background: 'FFFFFF',
    },
    name: {
        display: 'inline',
    },
    score: {
        display: 'inline',
        marginLeft: '70%',
    },
});

export default function Scoreboard({ gameManager }) {
    const [players, setPlayers] = useState(gameManager.players);
    const classes = useStyles();

    useEffect(() => {
        // Subscribe each player for changes
        players.forEach((player) => {
            player.subscribe(update);
        });
        return () =>
            // Unsubscribe when component is destroyed
            players.forEach((player) => {
                player.unsubscribe(update);
            });
        //eslint-disable-next-line
    }, []);

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
                <h2 className={classes.scoreHeader}>SCOREBOARD</h2>
                {players.map((player) => (
                    <div className={classes.playerScore} key={player.id}>
                        <p className={classes.name}>{`${player.name}: `}</p>
                        <p className={classes.score}>{`${player.score}`}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
