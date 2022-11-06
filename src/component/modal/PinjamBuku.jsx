import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addOnePinjam } from "../../redux/pinjam"
import "../../asset/css/modal.css"
import LoadingModal from "../loading/LoadingModal"

const date = new Date()
console.log(date)
let dd = date.getDate()
let mm = date.getMonth()
let yy = date.getFullYear()

console.log(dd, mm, yy)

if(dd < 10){
    dd = "0"+dd
}

if(mm < 10){
    mm = "0"+mm
}

const PinjamBuku = ( props ) => {
    const username = localStorage.getItem('username')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        id_book: props.item.id_book,
        username: username,
        tanggal_pinjam : `${yy}-${mm}-${dd}`,
        tanggal_balik: `${yy}-${mm}-${dd}`,
        jumlah: 1
    })

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const handlePinjam = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(addOnePinjam(form))
        .then((data) => {
            console.log(data)
            setLoading(false)
            navigate("/peminjaman")
        })
    }

    return(
        <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
            <LoadingModal success={loading} />
            <div className="main-modal p-3 rounded" style={{ "width": "50vw", "min-height": "50vh", "backgroundColor": "white"}}>
                <h1>Pinjam Buku</h1>
                <span className="btn-close" onClick={() => props.closeModal()}></span>
                <form>
                    <label>Buku</label>
                    <input type="text" value={props.item.name} className="form-control bg-secondary bg-opacity-10" readOnly/>
                    <label>Peminjam</label>
                    <input type="text" className="form-control bg-secondary bg-opacity-10" value={username} readOnly/>
                    <label>Tanggal Kembali</label>
                    <input className="form-control" type="date" name="tanggal_balik" min={`${yy}-${mm}-${dd}`} value={form.tglKembali} onChange={onChange}></input>
                    <button className="btn btn-primary mt-3 w-100" onClick={handlePinjam}>Pinjam</button>
                </form>
            </div>
        </div>
    )
}

export default PinjamBuku