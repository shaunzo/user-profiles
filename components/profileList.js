import Component from "react";

export default class ProfileList extends React.Component {

    render() {
        const { profiles } = this.props;

        return (
            <div>
                <p>The profile list</p>

                <div>

                    {/* {profiles.results.map(profile => (
                        <p>profile.gender</p>
                    ))} */}
                </div>

            </div>
        )
    }
}