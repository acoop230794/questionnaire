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
        <div className="displayUsers" key={index}>
            <p>{data.username}</p> <p>{data.score}</p>
        </div>
        )
    })
    return(
        <div className = "leaderboard">
            <div className="leaderboard-inner">
                <h1>Leaderboard</h1>
            
                    {displayUsers}
                
            </div>
        </div>
    )
}
export default Leaderboard;