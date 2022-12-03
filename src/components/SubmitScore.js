export function SubmitScore({ handleNameInput, handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <label>Input your Name:</label>
            <input type="text" onChange={handleNameInput}/>
            <button type="submit">Submit</button>
        </form>
    )
}