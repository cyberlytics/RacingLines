import { useEffect, useState } from 'react';

export default function Scoreboard({ gameSetUp }) {
    const [players, setPlayers] = useState(gameSetUp.players);

    useEffect(() => {
        // Subscribe each player for changes
        gameSetUp.players.forEach((player) => {
            player.subscribe(update);
        });
        return () =>
            // Unsubscribe when component is destroyed
            gameSetUp.players.forEach((player) => {
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
            <h2>Scoreboard</h2>
            {players.map((player) => (
                <div key={player.id}>
                    <p>{`${player.name}: ${player.score}`}</p>
                </div>
            ))}
        </>
    );
}
