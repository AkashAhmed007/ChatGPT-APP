import { Link } from 'react-router-dom'
import './chatlist.css'

function ChatList() {
  return (
    <div className='chatlist'>
        <span className='title'>DASHBOARD</span>
        <Link to='/dashboard'>Create a new Chat</Link>
        <Link to='/'>Explore RESHMI AI</Link>
        <Link to='/'>Contact</Link>
        <hr />
        <span className='title'>RECENT CHATS</span>
        <div className="list">
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
            <Link to='/'>My chat title</Link>
        </div>
        <hr />
        <div className="upgrade">
            <img src="/logo.PNG" alt="logo" />
            <div className="text">
                <span>Upgrate to RESMI AI Pro</span>
                <span>Get Unlimited access to all features</span>
            </div>
        </div>
    </div>
  )
}

export default ChatList