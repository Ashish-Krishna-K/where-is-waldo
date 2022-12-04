export function SubmitScore({ nameInput, handleNameInput, handleSubmit, handleCancel }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Input your Name:</label>
                <input type="text" value={nameInput} onChange={handleNameInput}/>
            </div>
            <div id="buttons">
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}