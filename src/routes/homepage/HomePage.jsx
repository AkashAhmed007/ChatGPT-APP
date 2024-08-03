import { Link } from 'react-router-dom'
import './hompage.css'

function HomePage() {
  return (
    <div className='homepage'>
      <Link to='dashboard'>dashboard</Link>
    </div>
  )
}

export default HomePage