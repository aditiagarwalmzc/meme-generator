import navIcon from './../images/lol.svg';
import './header.css';

export default function Header() {
    return (
        <header>
            <div className='meme-nav-icon'>
                <img src={navIcon} alt="Haha text in a text bubble"/>
                <h1>Meme Generator</h1>
            </div>
        </header>
    )
}