import './Home.css';
import { gameList } from '../../resources/gameList';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return(
        <div className='game-list-container'>
            {gameList.map((game) => (
                <div className='game-list-item' 
                     key={game.id}
                     onClick={() => navigate(`/${game.id}`)}
                >
                    {game.display}
                </div>
            ))}
        </div>
    )
}