export function Timer({ time, setTime }) {

    setTimeout(() => {
        const date = new Date(time);
        date.setSeconds(date.getSeconds() + 1);
        setTime(date.toISOString());
    }, 1000);

    return (
        <p>{time.substring(11, 19)}</p>
    )
}