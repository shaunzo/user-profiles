import ProfileCard from "../components/profileCard";

class ProfileList extends React.Component {

    searchProfiles(searchTerm) {
        console.log(searchTerm);
    }
    
    render() {

        return (
            <div className="container profileList">
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
                {this.props.profilesArray.results.map(profile => (
                    <ProfileCard key={`${profile.name.first}-${profile.name.last}`} profileInfo={ profile }/>
                ))}

                <style jsx>{`
                    .profileList {
                        margin-top: 20px;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

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
                        margin-bottom: 20px;
                    }

                    .profileList-toolbar-search {
                        flex-basis: 50%;
                    }

                    .profileList-toolbar-search input {
                        width: 100%;
                    }
                `}</style>
            </div>
        );
    }
}

export default ProfileList;