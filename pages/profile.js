import fetch from 'isomorphic-fetch';
import Error from "next/error";
import Layout from "../components/layout";
import Link from "next/link";

class Profile extends React.Component {
    static async getInitialProps({ req, res, query }) {
        const email = query.email;
        const response = await fetch('https://randomuser.me/api/?results=50&seed=0cb0c83eae8f0a6e');
        const responseJSON = await response.json();
        const profile = responseJSON.results.filter(item => {
            if(item.email === email) {
                return item;
            }
        });

        return { profile };
    }

    render() {
        const { profile } = this.props;

        
        if (profile.length === 0) {
            return <Error statusCode={404} />
        }

        const userData = profile[0];

        return (
            <Layout title="User Profile">
                <div>
                    <div className="profile-top-banner">
                        <Link href="/">
                            <a className="back">Back to profiles</a>
                        </Link>

                        <div className="profile-avatar" style={{backgroundImage: `url(${userData.picture.large})`}}></div>
                        <div className="profile-header-info">
                            <h2>{userData.name.title} {userData.name.first} {userData.name.last}</h2>
                            <p>{userData.location.city} | <strong>{userData.location.country}</strong></p>
                        </div>
                    </div>

                    <div className="container">
                        <div className="profile-info">
                            <div className="profile-info-block">
                                <h3>Personal Information:</h3>
                                <p><strong>Gender:</strong> {userData.gender}</p>
                                <p><strong>Age:</strong> {userData.dob.age}</p>
                                <p><strong>Date of Birth:</strong> {userData.dob.date}</p>
                                <p><strong>ID:</strong> {userData.id.value || `-`}</p>
                                <p><strong>Nickname:</strong> {userData.id.name || `-`}</p>

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
        )
    }
}

export default Profile;