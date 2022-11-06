import '../../asset/css/loadingModal.css'

const LoadingModal = (props) => {
    return(
        <div className={props.success ? "wrap-loading-modal bg-black bg-opacity-75" : "d-none" }>
            <h1>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
            </h1>
        </div>
    )
}

export default LoadingModal