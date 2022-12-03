
export function Timer({time, setTime}) {
    /* what below function does is quite interesting, first it takes the current time state passed in as prop(it is ISO string format)
    and creates a date object from it. Then it adds one second to the date object and then changes the time state with the new date format converted to
    ISO string format. Changing the state causes the component to render but since the whole function is wrapped in a set time out set to 1 second it 
    essentially emulates a stopwatch behaviour. Pretty damn cool if you ask me.
    */
    setTimeout(() => {
        const date = new Date(time);
        date.setSeconds(date.getSeconds() + 1);
        setTime(date.toISOString());
    }, 1000);

    return (
        <div id="timer">{time.substring(11, 19)}</div>
    )
}