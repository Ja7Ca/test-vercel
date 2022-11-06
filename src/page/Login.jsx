import '../asset/css/login.css'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from "../redux/user"
import LoadingModal from '../component/loading/LoadingModal'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = localStorage.getItem('username');
    const roleLogin = localStorage.getItem('role');

    const login = useSelector((state) => state.user.login)
    const [status, setStatus] = useState("")

    if(!_.isEmpty(login)){
        // Navigate("/")
    }

    const [msgError , setMsgError] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        if(username && roleLogin){
          navigate('/')
        }
      }, [username, roleLogin, loading])

    const handleLogin = (e) => {
        e.preventDefault()
        if(data.username && data.password){
            dispatch(userLogin(data))
            .then((data) => {
                setLoading(true)
                if(_.isEmpty(data.payload.users)){
                    setStatus("Login Gagal")
                } else {
                    navigate('/')
                }
                setLoading(false)
            })
            .catch((err) => {
                setStatus("Login Gagal")
            })
        } else {
            if(!msgError.username || !msgError.password){
                setMsgError(true)
            }
        }
    }
    return (
        <div className="login d-flex justify-content-center align-items-center bg-secondary bg-opacity-25">
            <LoadingModal success={loading} />
            <div className="login-wrap bg-white ps-5 py-5 pe-4 shadow text-center" style={{ "maxWidth": "80vh","position": "relative"}}>
            <div className="card-shadow" style={{ "left": "0" }}></div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.9005 34.5998C31.5405 34.5998 28.4405 33.0198 26.4205 30.2398C25.9405 29.5798 26.0805 28.6398 26.7405 28.1398C27.4005 27.6398 28.3405 27.7998 28.8405 28.4598C30.3005 30.4398 32.5005 31.5798 34.9005 31.5798C39.0805 31.5798 42.5005 28.1798 42.5005 23.9798C42.5005 19.7798 39.1005 16.3798 34.9005 16.3798C32.0605 16.3798 29.3805 17.8998 27.9205 20.3198L22.6205 29.1398C20.6205 32.4798 16.9605 34.5398 13.0805 34.5398C7.24047 34.5398 2.48047 29.7798 2.48047 23.9398C2.48047 18.0998 7.24047 13.3398 13.0805 13.3398C16.4405 13.3398 19.5405 14.9198 21.5605 17.6998C22.0405 18.3598 21.9005 19.2998 21.2405 19.7998C20.5605 20.2998 19.6405 20.1398 19.1405 19.4798C17.7005 17.5398 15.5005 16.3998 13.1005 16.3998C8.92047 16.3998 5.50047 19.7998 5.50047 23.9998C5.50047 28.1998 8.90047 31.5998 13.1005 31.5998C15.9405 31.5998 18.6205 30.0798 20.0805 27.6598L25.3805 18.8398C27.3805 15.4998 31.0405 13.4398 34.9205 13.4398C40.7605 13.4398 45.5205 18.1998 45.5205 24.0398C45.5205 29.8798 40.7405 34.5998 34.9005 34.5998Z" fill="#408AFD"/>
                <path d="M13 28C15.2091 28 17 26.2091 17 24C17 21.7909 15.2091 20 13 20C10.7909 20 9 21.7909 9 24C9 26.2091 10.7909 28 13 28Z" fill="#408AFD"/>
                <path d="M35 28C37.2091 28 39 26.2091 39 24C39 21.7909 37.2091 20 35 20C32.7909 20 31 21.7909 31 24C31 26.2091 32.7909 28 35 28Z" fill="#408AFD"/>
            </svg>
                <h1 className="text-center pb-3">Login Sibook</h1>
                { msgError ? (<span className="text-danger">Isi Semua Data</span>) : "" }
                <span className="text-danger">{status}</span>
                <form className="text-start">
                    <label className="mt-3">
                        Username {msgError.username ? (<span className="text-danger">masih kosong</span>) : ""}
                    </label>
                    <input type="text" name="username" className="form-control" placeholder="Masukkan Username..." value={data.username} onChange={onChange}/>
                    <label className="mt-3">
                        Password {msgError.password ? (<span className="text-danger">masih kosong</span>) : ""}
                    </label>
                    <input type="password" name="password" className="form-control" placeholder="Masukkan Password.." value={data.password} onChange={onChange}/>
                    <button type="submit" className="btn bg-blue text-white mt-3 form-control" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login