import anya from '../../asset/image/download.jpg'

const Profile = () => {
    const userLogin = localStorage.getItem('username');
    return (
        <div className="nav-profile d-flex align-items-center">
            <div className="nav-image me-3" style={{ "width": "3em", "height": "3em", "borderRadius": "100%", "overflow": "hidden" }}>
                <img src={anya} alt="" style={{ "objectFit": "cover", "height": "100%" }}/>
            </div>
            <h5 className="profile-title" style={{ "margin": "0" }}>{userLogin}</h5>
        </div>
    )
}

export default Profile