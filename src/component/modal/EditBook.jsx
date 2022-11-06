import { useState } from "react"
import { useDispatch } from 'react-redux'
import { EditOneBook } from '../../redux/book'
import "../../asset/css/modal.css"
import _ from "lodash"
import axios from "axios"
import LoadingModal from "../loading/LoadingModal"


const EditBuku = ( props ) => {
    const dispatch = useDispatch()

    const [fileImage, setFileImage] = useState("")
    const [loadImage, setLoadImage] = useState(false)
    
    const [data, setData] = useState({
        name: "",
        author: "",
        desc: "",
        rating: "",
        pages: "",
        stock: "",
        image: "",
    })

    // console.log(data, props.item)
    const onChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadImage(true)
        if(fileImage){
            const upload = new FormData()
        upload.append("file", fileImage)
        upload.append("upload_preset", "iw7usncs")
        upload.append("cloud_name","ja7ca")
        await axios.post("https://api.cloudinary.com/v1_1/ja7ca/image/upload", upload)
        .then((response) => {
            data.image = response.data["secure_url"]
        })
        }
        if(data.name || data.author || data.desc || data.rating || data.pages || data.stock || data.image){
            data.name = data.name || props.item.name
            data.author = data.author || props.item.author
            data.desc = data.desc || props.item.desc
            data.rating = data.rating || props.item.rating
            data.pages = data.pages || props.item.pages
            data.stock = data.stock || props.item.stock
            data.image = data.image || props.item.image
            data.id = data.id || props.item.id_book
            dispatch(EditOneBook(data))
            .then(data => {
                props.closeModal()
                props.change()
                setLoadImage(false)
            })
        } else {
            alert("Tidak ada perubahan")
        }
    }

    if(!_.isEmpty(props.item)){
        return(
            <div className={props.active ? "bg-dark bg-opacity-50 wrap-modal" : "d-none"}>
                <div className="main-modal p-3 rounded" style={{ "width": "50vw", "min-height": "50vh", "max-height": "80vh", "backgroundColor": "white"}}>
                    <LoadingModal success={loadImage} />
                    <h1>Edit Buku</h1>
                    <span className="btn-close" onClick={() => props.closeModal()}></span>
                    <form>
                        <label>Judul</label>
                        <input type="text" value={data.name || props.item.name} name="name" className="form-control" onChange={onChange}/>
                        <label>Author</label>
                        <input type="text" value={data.author || props.item.author} name="author" className="form-control" onChange={onChange}/>
                        <label>Desc</label>
                        <textarea className="form-control" name="desc" onChange={onChange}>{data.desc || props.item.desc}</textarea>
                        <label>Rating</label>
                        <input type="number" value={data.rating || props.item.rating} name="rating" className="form-control" max="5" onChange={onChange}/>
                        <label>Pages</label>
                        <input type="number" value={data.pages || props.item.pages} name="pages" className="form-control" onChange={onChange}/>
                        {/* <label>Stock</label>
                        <input type="number" value={data.stock || props.item.stock} name="stock" className="form-control" onChange={onChange}/> */}
                        <label>Cover</label>
                        <input type="file" name="image" className="form-control" onChange= {(e) => setFileImage(e.target.files[0])}/>
                        <button className="btn btn-primary mt-3 w-100" type="submit"  onClick={handleSubmit}>Edit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditBuku