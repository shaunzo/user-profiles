import Layout from "../components/layout.js";
import fetch from "isomorphic-fetch";
import Error from "next/error";
import ProfileList from "../components/profileList";
import Message from "../components/message";
import Checkbox from "../components/forms/checkbox";
import RadioButton from "../components/forms/radioButton"

class Index extends React.Component {

    static async getInitialProps() {
        let profiles;
        let filters;

        try {
            const response = await fetch ('https://randomuser.me/api/?results=50&seed=0cb0c83eae8f0a6e');
            profiles = await response.json();
            filters = {};

            filters.countries = await profiles.results.map(item => {
                return {
                    name: item.location.country,
                    active: false
                };
            });

            filters.cities = await profiles.results.map(item => {
               return {
                    name: item.location.city,
                    country: item.location.country,
                    active: false
               };
            });

        } catch (err) {
            console.log(err);
            profiles = [];
            filters.countries = [],
            filters.cities = []
        }

        return { profiles, filters };
    }

    constructor(props) {        
        super(props);
        
        // Remove duplicate values from arrays
        const uniqueCountries = [...new Map(props.filters.countries.map(item => [item.name, item])).values()];
        const uniqueCities = [...new Map(props.filters.cities.map(item => [item.name, item])).values()];

        // Set state
        this.state = {
            profiles: props.profiles,
            expandFilter: false,
            expandSortPanel: false,
            filters: {
                countries: uniqueCountries,
                cities: uniqueCities
            }
        };
    }

    setInitialFilter(propsName) {
        return [...new Map(propsName.map(item => [item.name, item])).values()];
    }

    applyProfileFilter(index, value, type) {
        
        if(index && type === 'countries') {
            let countries = [...this.state.filters.countries];
            let countriesObj = {};

            countries.forEach(country => {
                countriesObj[country.name] = true;
            });

            let selectedCountries = countries.filter(country => {
                if(country.active) {
                    return country;
                }
            })

            let cities = this.setInitialFilter(this.props.filters.cities);

            if(selectedCountries.length > 0) {
                cities = cities.filter(city => {
                    if(countriesObj[city.country]) {
                        return city;
                    }
                });
            }

            let filteredCities = [];
            let filteredCountries = []

            countries[index].active = !countries[index].active;

            let selectedCities = cities.filter(city => {
                return city.active === true;
            })

            if(selectedCities.length > 0) {
                cities = selectedCities;
            }

            countries.forEach(country => {
                if(country.active) {
                    cities.forEach(city => {
                        if(city.country === country.name) {
                            filteredCities.push(city);
                        }
                    });
                }
            });

            let updatedCities;
            filteredCities.length > 0 ? updatedCities = filteredCities : updatedCities = cities;
            let updatedCountries;
            filteredCountries.length > 0 ? updatedCountries = filteredCountries : updatedCountries = this.state.filters.countries;
    
            this.setState(prevState => {
                let filters = {};
                filters = { ...prevState.filters };
                filters.countries = updatedCountries;
                filters.cities = updatedCities;
                return { filters };
            });
        };

        if(index && type === 'cities') {
            let cities = [...this.state.filters.cities];
            cities[index].active = !cities[index].active;
            this.setState(prevState => {
                let filters = {...prevState.filters};
                filters.cities = cities;
                return { filters };
            });
        }

        /**
         * Update displayed profiles against filters
         */

         let filteredProfiles = [];
         selectedCountries = [...this.state.filters.countries].filter(country => country.active);
         let selectedCities = [...this.state.filters.cities].filter(city => city.active);

         if(selectedCities.length > 0 && selectedCountries.length > 0) {
             let countriesObj = {};
             let citiesObj = {};

             selectedCountries.forEach(country => {
                countriesObj[country.name] = true;
             });

             selectedCities.forEach(city => {
                citiesObj[city.name] = true;
            });

             filteredProfiles = [...this.props.profiles.results].filter(profile => {
                 let cityInCountry = false;
                 
                 selectedCities.forEach(city => {
                     if(countriesObj[city.country]) {
                         cityInCountry = true;
                     }
                 });

                if( countriesObj[profile.location.country] &&
                    citiesObj[profile.location.city] &&
                    cityInCountry
                ) {
                    return profile;
                }
            }); 
         }

         if(selectedCountries.length > 0 && selectedCities.length === 0) {
             let countriesObj = {};
             selectedCountries.forEach(country => {
                 countriesObj[country.name] = true;
             });
 
             filteredProfiles = [...this.props.profiles.results].filter(profile => {
                 if(countriesObj[profile.location.country]) {
                     return profile;
                 }
             });
         }
         
         if(selectedCountries.length === 0 && selectedCities.length > 0) {
            let citiesObj = {};
            selectedCities.forEach(city => {
                citiesObj[city.name] = true;
            });

            filteredProfiles = [...this.props.profiles.results].filter(profile => {
                if(citiesObj[profile.location.city]) {
                    return profile;
                }
            });
        }
         
         if(selectedCities.length === 0 && selectedCountries.length === 0) {
             filteredProfiles = this.props.profiles.results;
         }

        this.setState({
            profiles: {
                results: filteredProfiles
            },
        });
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
        const cities = this.setInitialFilter(this.props.filters.cities);
        const countries = this.setInitialFilter(this.props.filters.countries);

        countries.forEach(country => {
            country.active = false;
        });

        cities.forEach(city => {
            city.active = false;
        });

        this.setState({
            profiles: {
                results: initialState.results
            },
            filters: {
                cities,
                countries
            },
            expandFilter: false,
            expandSortPanel: false,
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
                                    <button
                                        className={`${this.state.expandSortPanel ? "active" : ""}`} onClick={() => this.setState({expandSortPanel: !this.state.expandSortPanel})}>
                                        Sort
                                    </button>
                                    <button onClick={() => this.resetProfiles()}>Reset</button>
                                </div>
                            </div>

                            {/* Filter Panel */}
                            <div className={`profileList-toolbar-expansion-panel ${this.state.expandFilter ? "active" : ""}`}>
                                <div className="panel-row">
                                    <div className="panel-col-1">
                                        <strong>Filter by:</strong>
                                    </div>

                                    <div className="panel-col-2">
                                        <div className="bold-text">Countries:</div>
                                    </div>

                                    <div className="panel-col-3">
                                        {
                                            this.state.filters.countries.length === 0 ?
                                            <span>No filters for country</span> : 
                                            this.state.filters.countries.map((country, i) => {
                                                return (
                                                    <span className="input-wrapper" key={i}
                                                        onClick={() => this.applyProfileFilter(i, country.name, 'countries')}>
                                                        <Checkbox label={ country.name } selected={ country.active } />
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="panel-row">
                                    <div className="panel-col-1"></div>

                                    <div className="panel-col-2">
                                        <div className="bold-text">Cities:</div>
                                    </div>

                                    <div className="panel-col-3">
                                        {
                                            this.state.filters.cities.length === 0 ?
                                            <span>No filters for city</span> : 
                                            this.state.filters.cities.map((city, i) => {
                                                return (
                                                    <span className="input-wrapper" key={i}
                                                        onClick={() => this.applyProfileFilter(i, city.name, 'cities')}>
                                                        <Checkbox label={ city.name } selected={ city.active } />
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Sort Panel */}
                            <div className={`profileList-toolbar-expansion-panel ${this.state.expandSortPanel ? "active" : ""}`}>
                                <div className="panel-row">
                                    <div className="panel-col-1">
                                        <strong>Sort by:</strong>
                                    </div>

                                    <div className="panel-col flex-spacer">
                                        <RadioButton label="First Name" />
                                        <RadioButton label="Last Name" />
                                        <RadioButton label="Country" />
                                        <RadioButton label="City" />
                                    </div>

                                    <div className="panel-col">
                                        <RadioButton label="Asc" />
                                        <RadioButton label="Desc" />
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
                        padding-top: 20px;
                    }

                    .panel-row:first-child {
                        padding-top: 0;
                    }

                    .panel-col-1,
                    .panel-col-2 {
                        flex-basis: 100px;
                        flex-grow: 0;
                        flex-shrink: 0;
                    }

                    .panel-col-2,
                    .panel-col-3 {
                        padding-left: 20px;
                    }

                    .panel-col-3 {
                        flex-grow: 1;
                    }
                    
                    .panel-col-1,
                    .panel-col-2,
                    .panel-col-3 {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }

                    .panel-col {
                        display: flex;
                        flex-direction: row;
                        justify-content: left;
                    }

                    .input-wrapper {
                        flex-basis: 180px;
                    }

                `}</style>
            </div>
        )
    }
};

export default Index;