import { useState } from 'react';
import waldoImg from '../images/where-is-waldo.jpg';
import { Options } from './Options';

export function Waldo({ setRange, handleUserChoice, userClicked , setUserClicked, correctChoices }) {
    const [coordinates, setCoordinates] = useState({
        left: null,
        top: null,
    })

    const handleClick = (e) => {
        setUserClicked(true);
        setCoordinates({
            left: e.nativeEvent.offsetX,
            top: e.nativeEvent.offsetY,
        });
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
            {userClicked && <div style={coordinates} className='attempt'></div>}
            {userClicked && <Options coordinates={coordinates} handleUserChoice={handleUserChoice}/>}
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
