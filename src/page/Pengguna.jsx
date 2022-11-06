import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../redux/user'
import Tambahuser from "../component/modal/TambahUser"
import Loading from "../component/loading/Loading"
import _ from "lodash"
import EditUser from "../component/modal/EditUser"
import HapusUser from "../component/modal/HapusUser"

const Pengguna = () => {
    const columns = [{
        name: 'Username',
        selector: row => row.username,
    },{
        name: 'Button',
        cell: (row) => (
            <div className="d-flex flex-column">
          <button className='btn btn-primary d-block mb-1' onClick={() => handleModal("edit", row)}>Edit</button>
          <button className='btn btn-danger d-block' onClick={() => handleModal("hapus", row)}>Hapus</button>
          </div>
        ),
        button: true,
    },]

    const [change, setChange] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [modal, setModal] = useState({
        tambah: false,
        edit: false,
        hapus: false
    })

    const [item, setItem] = useState({
        tambah: {},
        edit: {},
        hapus: {}
    })

    const handleModal = (item, row) => {
        setModal({
            ...modal,
            [item]: !modal[item]
        })
        setItem({
            ...item,
            [item]: row
        })
    }

    const haveChange = () => {
        setChange(!change)
    }

    useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch, change]);
    if(!_.isEmpty(user.user)){
        return (
            <div className="position-relative">
                <div className="btn btn-primary btn-tambah" onClick={() => handleModal("tambah")}>Tambah User</div>
                <DataTable title="User List" columns={columns} data={user.user} pagination/>
                <Tambahuser active={modal.tambah} closeModal={() => handleModal("tambah")} change={haveChange} />
                <EditUser active={modal.edit} closeModal={() => handleModal("edit")} change={haveChange} item={item.edit}/>
                <HapusUser active={modal.hapus} closeModal={() => handleModal("hapus")} change={haveChange} item={item.hapus}/>
            </div>
        )
    } else {
        return(
            <Loading />
        )
    }
}

export default Pengguna