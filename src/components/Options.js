export function Options({ coordinates, handleUserChoice }) {
    
    return (
        <div style={coordinates} id="options">
            <button data-name='waldo' onClick={handleUserChoice}>Waldo</button>
            <button data-name='wilma' onClick={handleUserChoice}>Wilma</button>
            <button data-name='winoa' onClick={handleUserChoice}>Winoa</button>
            <button data-name='wizard' onClick={handleUserChoice}>Wizard</button>
            <button data-name='odlaw' onClick={handleUserChoice}>Odlaw</button>
        </div>
    )
}