import Link from "next/link";

const ProfileCard = ({ profileInfo }) => (

    <div className="profileCard">
        <div className="profileCard--image" style={{backgroundImage: `url(${profileInfo.picture.large})`}}></div>
        <div className="profileCard--info">{`${profileInfo.name.title} ${profileInfo.name.first} ${profileInfo.name.last}`}</div>
        <div className="profileCard--info">{ profileInfo.location.city }</div>
        <Link 
            as={`/profiles/${profileInfo.name.first}-${profileInfo.name.last}`}
            href={'/profiles/profile?'
            + `&title=${profileInfo.name.title}`
            + `&firstName=${profileInfo.name.first}`
            + `&lastName=${profileInfo.name.last}`
            + `&cell=${profileInfo.cell}`
            + `&phone=${profileInfo.phone}`
            + `&email=${profileInfo.email}`
            + `&gender=${profileInfo.gender}`
            + `&picture=${profileInfo.picture.large}`
            + `&age=${profileInfo.dob.age}`
            + `&dob=${profileInfo.dob.date}`
            + `&nickName=${profileInfo.id.name}`
            + `&id=${profileInfo.id.value}`
            + `&nationality=${profileInfo.nat}`
            + `&country=${profileInfo.location.country}`
            + `&city=${profileInfo.location.city}`
            + `&postcode=${profileInfo.location.postcode}`
            + `&state=${profileInfo.location.state}`
            + `&streetAddress=${profileInfo.location.street.number} ${profileInfo.location.street.name}`
            + `&latitude=${profileInfo.location.coordinates.latitude}`
            + `&longitude=${profileInfo.location.coordinates.longitude}`
            + `&timezone=${profileInfo.location.timezone.description}`
        
        }>View</Link>

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