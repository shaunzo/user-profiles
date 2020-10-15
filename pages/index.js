import Layout from "../components/layout.js";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import ProfileList from "../components/profileList";
import Message from "../components/message";

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

    constructor(props) {
        super(props);
        this.state = {
            profiles: props.profiles,
            expandFilter: false
        };
    }


    applyProfileSearch(searchTerm) {

        if(searchTerm) {
            const filteredProfiles = this.state.profiles.results.filter(item => {
                let result = -1;
                result = item.name.first.toLowerCase().search(searchTerm.toLowerCase());
                if(result > -1) {
                    return item;
                }

                result = item.name.last.toLowerCase().search(searchTerm.toLowerCase());
                if(result > -1) {
                    return item;
                }

                result = item.location.city.toLowerCase().search(searchTerm.toLowerCase());
                if(result > -1) {
                    return item;
                }
            });
    
            this.setState({
                profiles: {
                    results: filteredProfiles
                },
                search: searchTerm
            });
        } else {
            this.resetProfiles();
        }
    }

    resetProfiles() {
        const initialState = this.props.profiles;
        this.setState({
            profiles: {
                results: initialState.results
            },
            expandFilter: false,
            search: null
        });
    }

    render() {

        if(this.state.profiles.length === 0) {
            return <Error statusCode={503} />
        }

        return (
            <div>
                <Layout title="Profiles">
                    <div className="container">
                        <div className="profileList-toolbar-wrapper">
                            <div className="profileList-toolbar">
                                <div className="profileList-toolbar-search">
                                    <input id="search"
                                        onInput={(e)=> this.applyProfileSearch(e.target.value)} type="text" placeholder="Search names or cities"/>
                                </div>
                                <div className="flex-spacer"></div>
                                <div className="profileList-toolbar-buttons">
                                    <button
                                        className={`${this.state.expandFilter ? "active" : ""}`} onClick={() => this.setState({expandFilter: !this.state.expandFilter})}>
                                        Filter
                                    </button>
                                    <button>Sort</button>
                                    <button onClick={() => this.resetProfiles()}>Reset</button>
                                </div>
                            </div>

                            <div className={`profileList-toolbar-expansion-panel ${this.state.expandFilter ? "active" : ""}`}>
                                <div className="panel-row">
                                    <div className="panel-col-1">
                                        <strong>Filter by:</strong>
                                    </div>

                                    <div className="panel-col-2">
                                        <div className="bold-text">Countries:</div>
                                    </div>

                                    <div className="panel-col-3">
                                        <div className="checkbox-item">
                                            <span className="checkbox"></span> America
                                        </div>
                                    </div>
                                </div>

                                <div className="panel-row">
                                    <div className="panel-col-1"></div>

                                    <div className="panel-col-2">
                                        <div className="bold-text">Cities:</div>
                                    </div>

                                    <div className="panel-col-3">
                                        <div className="checkbox-item">
                                            <span className="checkbox"></span> America
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    { 
                        this.state.profiles.results.length === 0 && this.state.search !== null ?
                        <Message message="There are no records under those search terms."/> : 
                        <ProfileList profilesArray={ this.state.profiles } />
                    }
    
                </Layout>
                <style jsx>{`
                    .flex-spacer {
                        flex-grow: 1;
                    }


                    .profileList-toolbar-wrapper {
                        display: flex;
                        flex-direction: column;
                        margin: 20px 0;
                    }

                    .profileList-toolbar {
                        flex-basis:100%;
                        display: flex;
                        flex-direction: row;
                        color: #fff;
                        padding: 10px;
                        background-color: var(--accent-color);
                    }

                    .profileList-toolbar-search {
                        flex-basis: 50%;
                    }

                    .profileList-toolbar-search input {
                        width: 100%;
                    }

                    .profileList-toolbar-expansion-panel {
                        border-top: 1px solid var(--background-pale-color);
                        color: var(--background-pale-color);
                        padding: 8px 15px;
                        background-color: var(--accent-color);
                        display: none;
                    }

                    .profileList-toolbar-expansion-panel.active {
                        transform: scale(1,1);
                        opacity: 1;
                        display: flex;
                        flex-direction: column;
                    }

                    .panel-row {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                    }

                    .panel-col-1,
                    .panel-col-2 {
                        flex-basis: 100px;
                    }

                    .panel-col-2,
                    .panel-col-3 {
                        padding-left: 20px;
                    }

                    .panel-col-3 {
                        flex-grow: 1;
                    }

                    .checkbox-item {
                        cursor: pointer;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        margin-right: 20px
                    }

                    .checkbox-item .checkbox {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        border: 1px solid #fff;
                        margin-right: 5px;
                        margn-bottom: 5px;
                    }

                `}</style>
            </div>
        )
    }
};

export default Index;