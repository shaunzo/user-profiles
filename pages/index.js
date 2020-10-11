import Layout from "../components/layout.js";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import ProfileList from "../components/profileList";

class Index extends React.Component {
    static async getInitialProps() {
        let profiles;

        try {
            const response = await fetch ('https://randomuser.me/api/?results=50');
            profiles = await response.json();
        } catch (err) {
            console.log(err);
            profiles = [];
        }

        return { profiles };
    }

    render() {
        const { profiles } = this.props;

        if(profiles.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <Layout title="Profiles">
                <div className="container">
                    {profiles.results.map(profile => (
                        <div className="profileCard">
                            <div className="profileCard--info">
                                <div className="profileCard--name">{`${profile.name.title} ${profile.name.first} ${profile.name.last}`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>
        )
    }
};

export default Index;