import { useState } from 'react';
import waldoImg from '../images/where-is-waldo.jpg';
import { Options } from './Options';

export function Waldo({ setRange, handleUserChoice, userClicked, setUserClicked, correctChoices }) {
    // ok lots of stuff going on here first off the below state is purely to handle where the box/tagged area appears when user clicks on it
    const [coordinates, setCoordinates] = useState({
        left: null,
        top: null,
    })
    // ideally the below function should be in app.js but it's here because it also needs to modify the coordinate state present here
    const handleClick = (e) => {
        setUserClicked(true); // setting it to true here will render the options and box to render
        // this is where we are setting our position attributes
        setCoordinates({
            left: e.nativeEvent.offsetX,
            top: e.nativeEvent.offsetY,
        });
        // and this creates the area that is used to validate the user choices
        setRange({
            leftMin: e.nativeEvent.offsetX - 15,
            leftMax: e.nativeEvent.offsetX + 15,
            topMin: e.nativeEvent.offsetY - 15,
            topMax: e.nativeEvent.offsetY + 15,
        });
    };
    return (
        <div id='container'>
            <img src={waldoImg} alt='where-is-waldo' className='waldo-image' onClick={handleClick} />
            {userClicked && <div style={coordinates} className='attempt'></div>} {/* the box thing only renders if userClicked is true*/} 
            {userClicked && <Options coordinates={coordinates} handleUserChoice={handleUserChoice}/>} {/* same as above basically */}
            {/* Ok this is quite tricky, what's happening here is if the correctChoices state 1 or more items(meaning the user has correctly
                identified the character) we will render a green box around that character to mark it as done */}
            {correctChoices.length !== 0 && correctChoices.map(item => {
                const position = {
                    top: item.coordinates.yAxis,
                    left: item.coordinates.xAxis,
                }
                return <div style={position} className='correct' key={item.name}></div>
            })}
        </div>
    )
}
