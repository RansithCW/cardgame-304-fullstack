import { Link } from 'react-router-dom';
import "../App.css"

export default function Navbar() {
    return (
        <nav style={{ backgroundColor: '#333', padding: '10px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
                <li>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                        <button>Home</button>
                    </Link>
                </li>
                <li>
                    <Link to="/bidding" style={{ color: '#fff', textDecoration: 'none' }}>
                        <button>Go to Bidding</button>
                    </Link>
                </li>
                {/* <li>
                    <Link to="/trump" style={{ color: '#fff', textDecoration: 'none' }}>
                        <button>Set Trump</button>
                    </Link>
                </li> */}
                <li>
                    <Link to="/game" style={{ color: '#fff', textDecoration: 'none' }}>
                        <button>Play Game</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
