import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchOneBook } from '../../redux/book'
import Loading from "../loading/Loading"

import PinjamBuku from "../modal/PinjamBuku"

import _ from 'lodash'

const DetailBook = (props) => {
    const roleLogin = localStorage.getItem('role');

    const [modal, setModal] = useState(false)
    const {id} = useParams()
    const book = useSelector((state) => state.book)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleModal = () => {
        setModal(!modal)
    }

    useEffect(() => {
        setLoading(true)
		dispatch(fetchOneBook(id))
        .then(book => {
            setLoading(false)
        })
	}, [dispatch, id]);
    // if(!_.isEmpty(book.detailBook)){
    if(!_.isEmpty(book.detailBook)){
        return (
            <div style={{ "width": "100%", "height": "100%"}} className="row px-3">
            <div className="col-4 detail-image shadow-lg p-0" style={{ "width": "15em", "height": "20em", "overflow": "hidden", "position": "relative"}}>
                <div className="card-shadow"></div>
                <img src={book.detailBook[0].image} style={{ "objectFit": "cover", "height": "100%"}}alt="" />
            </div>
            <div className="col detail-info d-flex flex-column justify-content-center align-items-baseline px-4">
                <h1>{book.detailBook[0].name}</h1>
                <p>{book.detailBook[0].author}</p>
                <div className="star">
                    {_.times(book.detailBook[0].rating, (i) => (
                        <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9185 14.3201C17.6595 14.5711 17.5405 14.9341 17.5995 15.2901L18.4885 20.2101C18.5635 20.6271 18.3875 21.0491 18.0385 21.2901C17.6965 21.5401 17.2415 21.5701 16.8685 21.3701L12.4395 19.0601C12.2855 18.9781 12.1145 18.9341 11.9395 18.9291H11.6685C11.5745 18.9431 11.4825 18.9731 11.3985 19.0191L6.96851 21.3401C6.74951 21.4501 6.50151 21.4891 6.25851 21.4501C5.66651 21.3381 5.27151 20.7741 5.36851 20.1791L6.25851 15.2591C6.31751 14.9001 6.19851 14.5351 5.93951 14.2801L2.32851 10.7801C2.02651 10.4871 1.92151 10.0471 2.05951 9.65012C2.19351 9.25412 2.53551 8.96512 2.94851 8.90012L7.91851 8.17912C8.29651 8.14012 8.62851 7.91012 8.79851 7.57012L10.9885 3.08012C11.0405 2.98012 11.1075 2.88812 11.1885 2.81012L11.2785 2.74012C11.3255 2.68812 11.3795 2.64512 11.4395 2.61012L11.5485 2.57012L11.7185 2.50012H12.1395C12.5155 2.53912 12.8465 2.76412 13.0195 3.10012L15.2385 7.57012C15.3985 7.89712 15.7095 8.12412 16.0685 8.17912L21.0385 8.90012C21.4585 8.96012 21.8095 9.25012 21.9485 9.65012C22.0795 10.0511 21.9665 10.4911 21.6585 10.7801L17.9185 14.3201Z" fill="#FFD700"/>
                        </svg>
                        </>
                    ))}
                </div>
                <p>{book.detailBook[0].desc}</p>
                <table>
                    <tr>
                        <td>Pages</td>
                        <td>:</td>
                        <td>{book.detailBook[0].pages}</td>
                    </tr>
                    {/* <tr>
                        <td>Stock</td>
                        <td>:</td>
                        <td>{book.detailBook[0].stock}</td>
                    </tr> */}
                </table>
                {roleLogin == 'user' ? (
                <div className="btn btn-primary" onClick={() => handleModal()}>
                    Pinjam Buku
                </div>
                ) : ""}
            </div>
            <PinjamBuku active={modal} closeModal={handleModal} item={book.detailBook[0]}/>
        </div>
        )
    } else {
        return(
            <Loading />
        )
    }
}

export default DetailBook