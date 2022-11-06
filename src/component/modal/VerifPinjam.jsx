import { useDispatch } from 'react-redux'
import { editOnePinjam } from '../../redux/pinjam'
import "../../asset/css/modal.css"

const VerifPinjam = ( props ) => {
    const dispatch = useDispatch()

    const handleVerif = (id) => {
        dispatch(editOnePinjam(id))
        .then((data) => {
            props.closeModal()
            props.change()
        })
    }
    if(props.idPinjam !== ""){
        return(
            <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
                <div className="main-modal p-3 rounded" style={{ "width": "50vw", "max-height": "80vh", "backgroundColor": "white"}}>
                    <h1 style={{ "text-align": "center"}}>Yakin Verify?</h1>
                    <span className="btn-close" onClick={props.closeModal}></span>
                    <p className="text-center">{`Verify ${props.idPinjam}`}</p>
                    <button className="btn btn-success mt-3 w-100" onClick={() => handleVerif(props.idPinjam)}>Verify</button>
                </div>
            </div>
        )
    }
}

export default VerifPinjam