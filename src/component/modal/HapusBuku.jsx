import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DeleteOneBook } from '../../redux/book'
import "../../asset/css/modal.css"
import LoadingModal from '../loading/LoadingModal'

const Tambahuser = ( props ) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleDelete = (id) => {
        setLoading(true)
        dispatch(DeleteOneBook(id))
        .then((data) => {
            props.closeModal()
            props.change()
            setLoading(false)
        })
    }
    if(props.idBook !== ""){
        return(
            <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
                <LoadingModal success={loading}/>
                <div className="main-modal p-3 rounded" style={{ "width": "50vw", "max-height": "80vh", "backgroundColor": "white"}}>
                    <h1 style={{ "text-align": "center"}}>Yakin Menghapus?</h1>
                    <span className="btn-close" onClick={() => props.closeModal()}></span>
                    <p className="text-center">Buku {props.idBook}</p>
                    <button className="btn btn-danger mt-3 w-100" onClick={() => handleDelete(props.idBook)}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Tambahuser