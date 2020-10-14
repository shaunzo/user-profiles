import Layout from "../components/layout.js";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import ProfileList from "../components/profileList";
import ProfileCard from "../components/profileCard";

class Index extends React.Component {
    static async getInitialProps() {
        let profiles;

        try {
            const response = await fetch ('https://randomuser.me/api/?results=50&seed=0cb0c83eae8f0a6e');
            profiles = await response.json();
        } catch (err) {
            console.log(err);
            profiles = [];
        }

        return { profiles };
    }

    state = this.props;

    render() {

        if(this.state.profiles.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <Layout title="Profiles">
                <ProfileList profilesArray={ this.state.profiles } />
            </Layout>
        )
    }
};

export default Index;