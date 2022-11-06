import { useState } from "react"
import { useDispatch } from "react-redux"
import { AddOneBook } from "../../redux/book"
import LoadingModal from '../loading/LoadingModal'
import "../../asset/css/modal.css"
import axios from "axios";

const TambahBuku = ( props ) => {
    const dispatch = useDispatch()

    const [fileImage, setFileImage] = useState("")
    const [loadImage, setLoadImage] = useState(false)

    const [uploadData, setUploadData] = useState({
        name: "",
        author: "",
        desc: "",
        rating: "",
        pages: "",
        stock: 1,
        image:""
    })

    const handleChange = (e) => {
        setUploadData({
            ...uploadData,
            [e.target.name]: e.target.value
        })
    }

    const changeImage = async (e) => {
        setFileImage(e.target.files[0])
    }
    
    const handleUpload = async (e) => {
        e.preventDefault()
        if(loadImage) {
            return alert("Gambar Belom diupload")
        } else {
            if(uploadData.name && uploadData.author && uploadData.desc && uploadData.rating && uploadData.pages && uploadData.stock){
                setLoadImage(true)
                const upload = new FormData()
        upload.append("file", fileImage)
        upload.append("upload_preset", "iw7usncs")
        upload.append("cloud_name","ja7ca")
        let data = ""
        await axios.post("https://api.cloudinary.com/v1_1/ja7ca/image/upload", upload)
        .then((response) => {
            data = response.data["secure_url"]
            uploadData.image=data
            dispatch(AddOneBook(uploadData))
            .then((data) => {
                props.closeModal()
                props.change()
                setUploadData({
                name: "",
                author: "",
                desc: "",
                rating: "",
                pages: "",
                stock: "",
                image: ""
            })
            setLoadImage(false)
            })
        })
            } else {
                console.log(uploadData)
                setLoadImage(false)
                alert("Masih ada yang kosong")
            }
        }
    }

    return(
        <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
            <div className="main-modal p-3 rounded" style={{ "width": "50vw", "min-height": "50vh", "max-height": "80vh", "backgroundColor": "white"}}>
                <LoadingModal success={loadImage}/>
                <h1>Tambah Buku</h1>
                <span className="btn-close" onClick={() => props.closeModal(false)}></span>
                <form>
                    <label>Judul</label>
                    <input type="text" value={uploadData.name} name="name" className="form-control" onChange={handleChange}/>
                    <label>Author</label>
                    <input type="text" value={uploadData.author} name="author" className="form-control" onChange={handleChange}/>
                    <label>Desc</label>
                    <textarea className="form-control" name="desc" onChange={handleChange}>{uploadData.desc}</textarea>
                    <label>Rating</label>
                    <input type="number" value={uploadData.rating} name="rating" className="form-control" max="5" onChange={handleChange}/>
                    <label>Pages</label>
                    <input type="number" value={uploadData.pages} name="pages" className="form-control" onChange={handleChange}/>
                    {/* <label>Stock</label>
                    <input type="number" value={uploadData.stock} name="stock" className="form-control" onChange={handleChange}/> */}
                    <label>Cover</label>
                    <input type="file" className="form-control" onChange= {changeImage}/>
                    <button className="btn btn-primary mt-3 w-100" onClick={handleUpload}>Tambah</button>
                </form>
            </div>
        </div>
    )
    
}

export default TambahBuku