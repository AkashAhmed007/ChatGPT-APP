import { Outlet } from 'react-router-dom'
import './dashboardlayout.css'

function Dashboardlayout() {
  return (
    <div>
        <div>MENU</div>
        <div><Outlet></Outlet></div>
    </div>
  )
}

export default Dashboardlayout