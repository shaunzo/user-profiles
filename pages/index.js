import Layout from "../components/layout.js";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import ProfileList from "../components/profileList";

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

    searchProfiles(searchTerm) {
        console.log(searchTerm);
    }

    render() {

        if(this.props.profiles.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <div>
                <Layout title="Profiles">
                    <div className="container">
                        <div className="profileList-toolbar">
                            <div className="profileList-toolbar-search">
                                <input onInput={(e)=> this.searchProfiles(e.target.value)} type="text" placeholder="Search" />
                            </div>
                        <div className="flex-spacer"></div>
                        <div className="profileList-toolbar-buttons">
                            <button>Filter by</button>
                            <button>Sort by</button>
                            <button>Reset</button>
                        </div>
                        </div>
                    </div>
                    <ProfileList profilesArray={ this.props.profiles } />
                </Layout>
                <style jsx>{`
                    .flex-spacer {
                        flex-grow: 1;
                    }

                    .profileList-toolbar {
                        flex-basis:100%;
                        display: flex;
                        flex-direction: row;
                        background-color: var(--accent-color);
                        color: #fff;
                        padding: 10px;
                        margin: 20px 0;
                    }

                    .profileList-toolbar-search {
                        flex-basis: 50%;
                    }

                    .profileList-toolbar-search input {
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
};

export default Index;