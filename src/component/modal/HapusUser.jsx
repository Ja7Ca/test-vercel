import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../redux/user'
import "../../asset/css/modal.css"
import LoadingModal from '../loading/LoadingModal'
import _ from 'lodash'

const HapusUser = ( props ) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleDelete = (id) => {
        setLoading(true)
        dispatch(deleteUser(id))
        .then((data) => {
            props.closeModal()
            props.change()
            setLoading(false)
        })
    }
    if(!_.isEmpty(props.item)){
        return(
            <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
                <LoadingModal success={loading}/>
                <div className="main-modal p-3 rounded" style={{ "width": "50vw", "max-height": "80vh", "backgroundColor": "white"}}>
                    <h1 style={{ "text-align": "center"}}>Yakin Menghapus?</h1>
                    <span className="btn-close" onClick={() => props.closeModal()}></span>
                    <p className="text-center">{props.item.username}</p>
                    <button className="btn btn-danger mt-3 w-100" onClick={() => handleDelete(props.item.username)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default HapusUser