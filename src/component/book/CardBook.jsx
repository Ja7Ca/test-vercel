import '../../asset/css/cardBook.css'

import {Link} from 'react-router-dom'

const CardBook = (props) => {
    return (
        <Link to={`/book/${props.item.id_book}`} className="card-book col-2" style={{ "color": "black", "textDecoration": "none" }}>
            <div className="card-image shadow">
                <img src={props.item.image} alt="" loading="eager" style={{ "objectFit": "cover", "height": "100%", "width": "100%"}}/>
                <div className="card-shadow"></div>
                {/* <div className="card-banner">{props.item.stock} Stok</div> */}
            </div>
            <p className="card-title mt-2">{props.item.name}</p>
            <p className="card-author">{props.item.author}</p>
        </Link>
    )
}

export default CardBook