import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchPinjams } from '../redux/pinjam'
import { useNavigate, Link } from "react-router-dom"
import _ from 'lodash'
import VerifPinjam from "../component/modal/VerifPinjam"
import HapusPinjam from "../component/modal/HapusPinjam"
import Loading from "../component/loading/Loading"

const Pinjam = () => {
    const userLogin = localStorage.getItem('username');

    const pinjam = useSelector((state) => state.pinjam)
    const navigate = useNavigate()
    const dispatch = useDispatch()
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

    const handleVerif = (item) => {
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
        name: 'Id Pinjam',
        selector: row => row.id_peminjaman,
    },{
        name: 'Buku',
        // selector: row => row.id_book,
        cell: (row) => (
            <Link to={`/book/${row.id_book}`}>Cek Buku</Link>
        )
    },{
        name: 'Peminjam',
        selector: row => row.username,
    },{
        name: 'Tanggal Pinjam',
        selector: row => row.tanggal_pinjam,
    },{
        name: 'Tanggal Balik',
        selector: row => row.tanggal_balik,
    },]
    if(userLogin == 'admin'){
        columns.push({
            name: 'Button',
            cell: (row) => (
                <div className="d-flex flex-column align-items-center">
                    {!row.status? (
              <button className='btn btn-success d-block mb-1' onClick={() => handleVerif(row.id_peminjaman)}>Verify</button>
              ) : ""}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={row.status? "" : "d-none"}>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.67 1.99988H16.34C19.73 1.99988 22 4.37988 22 7.91988V16.0909C22 19.6199 19.73 21.9999 16.34 21.9999H7.67C4.28 21.9999 2 19.6199 2 16.0909V7.91988C2 4.37988 4.28 1.99988 7.67 1.99988ZM11.43 14.9899L16.18 10.2399C16.52 9.89988 16.52 9.34988 16.18 8.99988C15.84 8.65988 15.28 8.65988 14.94 8.99988L10.81 13.1299L9.06 11.3799C8.72 11.0399 8.16 11.0399 7.82 11.3799C7.48 11.7199 7.48 12.2699 7.82 12.6199L10.2 14.9899C10.37 15.1599 10.59 15.2399 10.81 15.2399C11.04 15.2399 11.26 15.1599 11.43 14.9899Z" fill="#008000"/>
                </svg>
              <button className='btn btn-danger d-block' onClick={() => handleHapus(row.id_peminjaman)}>Hapus</button>
              </div>
            ),
            button: true,
        },)
    } else {
        columns.push({
            name: "Status",
            cell: (row) => (
                <span className={row.status ? "badge text-bg-success" : "badge text-bg-secondary" }>{ row.status ? "Done" : "Waiting" }</span>
            )
        })
    }

    useEffect(() => {
		dispatch(fetchPinjams());
	}, [dispatch, change]);
    console.log(pinjam, columns)
    if(!_.isEmpty(pinjam.pinjam)){
        let data = pinjam.pinjam
        if(userLogin != 'admin'){
            data = pinjam.pinjam.filter(val => {return val.username === userLogin})
        }
        return (
            <div className="position-relative">
                <DataTable title="Pinjam List" columns={columns} data={data} pagination/>
                <VerifPinjam active={edit.status} closeModal={handleVerif} idPinjam={edit.item} item={edit.item} change={haveChange}/>
                <HapusPinjam active={hapus.status} closeModal={handleHapus} idPinjam={hapus.item} change={haveChange} />
            </div>
        )
    } else {
        return(
            <Loading />
        )
    }
}

export default Pinjam