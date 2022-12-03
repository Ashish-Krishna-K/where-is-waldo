export function GameOver({ time }) {
    const score = time.substring(11, 19);
    return (
        <div>
            <p>Game Over!</p>
            <p>Your Score is: {score}</p>
        </div>
    )
}