import React from 'react'

const Dropdown = (props) => {
    return (
        <div className="App">
            <form>
                <label htmlFor="trivia_category">Category</label>
                <select name="trivia_category">
                    <option value="9" name="category">Genral Knowledge</option>
                    <option value="20" name="category">Mythology</option>
                    <option value="21" name="category">Sport</option>
                </select>
                <label htmlFor="trivia_difficulty"></label>
                <select name="trivia_difficulty">
                    <option name="difficulty" value="easy">Easy</option>
                    <option name="difficulty" value="medium">Medium</option>
                    <option name="difficulty" value="hard">Hard</option>
                </select>
                <button type="submit" onChange={props.setApi}>Submit</button>
            </form>
        </div>
    )
}

export default Dropdown;