import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Menu from "../component/menu/Menu"
import Hamburger from "../component/hamburger/Hamburger"
import Profile from "../component/profile/Profile"

const Home = ( ) => {
    const navigate = useNavigate()
    const login = useSelector((state) => state.user.login.username)
    const [menu, setMenu] = useState(true)
    const userLogin = localStorage.getItem('username');

    useEffect(() => {
      if(!userLogin){
        navigate('/login')
      }
    }, [userLogin])

    const handleClick = () => {
        setMenu(!menu)
    }
    const widthContainer = menu ? "85%" : "100%"
    return (
        <div className="d-flex">
      <Menu active={menu}/>
      <div className="main" style={{ "width": widthContainer, "position": "fixed", "right": "0px", "transitionDuration": "0.5s", "backgroundColor":"rgb(230 230 230)", "height": "100vh"}}>
        <div className="navbar py-2 mb-2 shadow-sm bg-white">
          <div class="container">
            <Hamburger active={menu} click={handleClick} />
            <Profile/>
          </div>
        </div>
        <div style={{ "overflow-y": "auto", "height": "100%" }}>
          <div className="content bg-white shadow-sm p-3" style={{ "width": "98%", "margin": "0 auto", "borderRadius": "6px","max-height": "86vh", "overflow-y": "auto" }}>
            <Outlet/>
            {/* <h1>Test</h1>
            <Table data={data} id="table1"/>
            <WrapBook/> */}
          </div>
        </div>
      </div>
    </div>
    )
}

export default Home