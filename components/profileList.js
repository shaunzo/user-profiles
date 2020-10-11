import ProfileCard from "../components/profileCard";

const ProfileList = ({ profilesArray }) => (
    <div className="container profileList">
        {profilesArray.results.map(profile => (
            <ProfileCard profileInfo={ profile }/>
        ))}

        <style jsx>{`
            .profileList {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        `}</style>
    </div>
);

export default ProfileList;