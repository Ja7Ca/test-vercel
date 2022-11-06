import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../../redux/user"
import "../../asset/css/modal.css"
import LoadingModal from "../loading/LoadingModal"


const Tambahuser = ( props ) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(form.username && form.password) {
            setLoading(true)
            dispatch(addUser(form))
            .then((data) => {
                props.change()
                props.closeModal()
                setLoading(false)
            })
        } else {
            setError("Data Masih Kosong")
        }
    }

    return(
        <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
            <LoadingModal success={loading} />
            <div className="main-modal p-3 rounded" style={{ "width": "50vw", "max-height": "80vh", "backgroundColor": "white"}}>
                <h1>Tambah User</h1>
                <span className="btn-close" onClick={() => props.closeModal()}></span>
                <form>
                    <span className="text-danger text-center d-block">{error}</span>
                    <label>Username</label>
                    <input type="text" value={form.username} name="username" className="form-control" onChange={onChange}/>
                    <label>Password</label>
                    <input type="password" value={form.password} name="password" className="form-control" onChange={onChange}/>
                    <button className="btn btn-primary mt-3 w-100" onClick={handleSubmit}>Tambah</button>
                </form>
            </div>
        </div>
    )
}

export default Tambahuser