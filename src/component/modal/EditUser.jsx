import { useState } from "react"
import { useDispatch } from "react-redux"
import { editUser } from "../../redux/user"
import "../../asset/css/modal.css"
import LoadingModal from "../loading/LoadingModal"
import _ from "lodash"


const EditUser = ( props ) => {
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
        if(form.password) {
            form.username = props.item.username
            setLoading(true)
            dispatch(editUser(form))
            .then((data) => {
                props.change()
                props.closeModal()
                setLoading(false)
            })
        } else {
            setError("Data Masih Kosong")
        }
    }
    if(!_.isEmpty(props.item)){
        return(
            <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
                <LoadingModal success={loading} />
                <div className="main-modal p-3 rounded" style={{ "width": "50vw", "max-height": "80vh", "backgroundColor": "white"}}>
                    <h1>Edit User</h1>
                    <span className="btn-close" onClick={() => props.closeModal()}></span>
                    <form>
                        <span className="text-danger text-center d-block">{error}</span>
                        <label>Username</label>
                        <input type="text" value={props.item.username} name="username" className="form-control bg-secondary bg-opacity-10" readOnly/>
                        <label>Password</label>
                        <input type="password" value={form.password} name="password" className="form-control" onChange={onChange}/>
                        <button className="btn btn-primary mt-3 w-100" onClick={handleSubmit}>Ganti Password</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditUser