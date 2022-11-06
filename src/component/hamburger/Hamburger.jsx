import '../../asset/css/hamburger.css'

const Hamburger = ( props ) => {
    return (
        <div className={ props.active ? "hamburger active" : "hamburger"} onClick={() => props.click()}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
    )
} 

export default Hamburger