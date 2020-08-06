import React, {useState, useEffect} from 'react';
import './Leaderboard.css';
import axios from 'axios';
function Leaderboard  ()  {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUser();
        console.log('Page loaded')
    }, [] );
    const getUser = async () =>{
        const res = await axios.get('/leaderboard');
        setUsers(res.data.data)
    }
    const displayUsers = users.length > 0 && users.map((data, index) => {
        return (
        <div key={index}>
            <h3>{data.username} {data.score}</h3>
        </div>
        )
    })
    return(
        <div>
            <h1>Leaderboard</h1>
            <div className = "leaderboard">
                {displayUsers}
            </div>
        </div>
    )
}
export default Leaderboard;