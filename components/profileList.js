import ProfileCard from "../components/profileCard";

const ProfileList = ({ profilesArray }) => (
    <div className="container profileList">
        {profilesArray.results.map(profile => (
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
        `}</style>
    </div>
);

export default ProfileList;