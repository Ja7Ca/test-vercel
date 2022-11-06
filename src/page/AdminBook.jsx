import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../redux/book'
import { useNavigate } from "react-router-dom"
import _ from 'lodash'
import TambahBuku from "../component/modal/TambahBuku"
import EditBuku from "../component/modal/EditBook"
import HapusBuku from "../component/modal/HapusBuku"
import Loading from "../component/loading/Loading"

const AdminBook = () => {
    const roleLogin = localStorage.getItem('role');

    const book = useSelector((state) => state.book)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState({
        item:{},
        status: false
    })
    const [hapus, setHapus] = useState({
        item: "",
        status: false
    })
    const [change, setChange] = useState(false)

    const haveChange = () => {
        setChange(!change)
    }

    const handleModal = (status) => {
        setModal(status)
    }

    const handleEdit = (item) => {
        setEdit({
            item: item,
            status: !edit.status
        })
    }

    const handleHapus = (item) => {
        setHapus({
            item: item,
            status: !hapus.status
        })
    }

    const columns = [{
        name: 'Book Id',
        selector: row => row.id_book,
    },{
        name: 'Name',
        selector: row => row.name,
    },{
        name: 'Author',
        selector: row => row.author,
    },{
        name: 'Rating',
        selector: row => row.rating,
    },{
        name: 'Desc',
        selector: row => row.desc,
    },{
        name: 'Page',
        selector: row => row.pages,
    },{
        name: 'image',
        cell: (row) => (
            <img src={row.image} width="100" height="150" style={{ "objectFit": "cover" }}/>
        ),
    },{
        name: 'Button',
        cell: (row) => (
            <div className="d-flex flex-column">
          <button className='btn btn-primary d-block mb-1' onClick={() => handleEdit(row)}>Edit</button>
          <button className='btn btn-danger d-block' onClick={() => handleHapus(row.id_book)}>Hapus</button>
          </div>
        ),
        button: true,
    },]

    useEffect(() => {
        if(roleLogin !== 'admin'){
            navigate('/')
        }
		dispatch(fetchBooks());
	}, [dispatch, change]);
    if(!_.isEmpty(book.book)){
        return (
            <div className="position-relative">
                <div className="btn btn-primary btn-tambah" onClick={() => handleModal(true)}>Tambah Buku</div>
                <DataTable title="Book List" columns={columns} data={book.book} pagination/>
                <TambahBuku active={modal} closeModal={handleModal} change={haveChange}/>
                <EditBuku active={edit.status} closeModal={handleEdit} item={edit.item} change={haveChange}/>
                <HapusBuku active={hapus.status} closeModal={handleHapus} idBook={hapus.item} change={haveChange} />
            </div>
        )
    } else {
        return(
            <Loading />
        )
    }
}

export default AdminBook