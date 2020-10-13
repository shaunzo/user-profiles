import Layout from "../../components/layout";
import { withRouter } from "next/router";
import Link from "next/link";

const Profile = ({router}) => (
    <Layout title="User Profile">
        <div>
            <div className="profile-top-banner">
                <Link href="/">
                    <a className="back">Back to profiles</a>
                </Link>

                <div className="profile-avatar" style={{backgroundImage: `url(${router.query.picture})`}}></div>
                <div className="profile-header-info">
                    <h2>{router.query.title} {router.query.firstName} {router.query.lastName}</h2>
                    <p>{router.query.city} | <strong>{router.query.country}</strong></p>
                </div>
            </div>

            <div className="container">
                <div className="profile-info">
                    <div className="profile-info-block">
                        <h3>Personal Information:</h3>
                        <p><strong>Gender:</strong> {router.query.gender}</p>
                        <p><strong>Age:</strong> {router.query.age}</p>
                        <p><strong>Date of Birth:</strong> {router.query.dob}</p>
                        <p><strong>ID:</strong> {router.query.id || `-`}</p>
                        <p><strong>Nickname:</strong> {router.query.nickName || `-`}</p>

                    </div>
                </div>
            </div>
            <style jsx>{`
                .profile-top-banner {
                    background-color: #000;
                    color: #fff;
                    padding: 20px;
                }

                .profile-top-banner a {
                    color: #fff;
                }

                .profile-avatar {
                    background-color: #fff;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    margin: 0 auto;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-position: center center;
                }

                .profile-header-info {
                    text-align: center;
                }

                .profile-info {
                    margin-top: 20px;
                    background-color: #fff;
                    padding: 20px;
                    color: #78787b;
                }
            `}</style>
        </div>
    </Layout>
);

export default withRouter(Profile)