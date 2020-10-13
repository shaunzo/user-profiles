import Link from "next/link";

const ProfileCard = ({ profileInfo }) => (

    <div className="profileCard">
        <div className="profileCard--image" style={{backgroundImage: `url(${profileInfo.picture.large})`}}></div>
        <div className="profileCard--info">{`${profileInfo.name.title} ${profileInfo.name.first} ${profileInfo.name.last}`}</div>
        <div className="profileCard--info">{ profileInfo.location.city }</div>
        <Link href={`/profile?email=${profileInfo.email}`}>View</Link>

        <style jsx>{`
            .profileCard {
                display: flex;
                flex-direction: column;
                width: 200px;
                height: 250px;
                margin-bottom: 15px;
            }

            .profileCard--image {
                flex-grow: 1;
                background-size: cover;
                background-repeat: no-repeat;
                border: 1px solid #000;
                margin-bottom: 15px;
            }
        `}</style>
    </div>
);

export default ProfileCard;