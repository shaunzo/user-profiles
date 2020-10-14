import Link from "next/link";

const ProfileCard = ({ profileInfo }) => (

    <div className="profileCard">
        <div className="profileCard--avatar" style={{backgroundImage: `url(${profileInfo.picture.large})`}}></div>
        <div className="profileCard--image" style={{backgroundImage: `url(/static/img-${Math.floor(Math.random() * (7 - 1)) + 1}.jpg)`}}></div>
        <div className="profileCard--info">
            <div className="profileCard--info--firstName">{profileInfo.name.first}</div>
            <div className="profileCard--info--lastName">{profileInfo.name.last}</div>
        </div>
        <div className="profileCard--info city">{ profileInfo.location.city }</div>
        <div className="profileCard--info view">
            <Link href={`/profile?email=${profileInfo.email}`}>View</Link>
        </div>

        {/* <div className="profileCard--image" style={{backgroundImage: `url(${profileInfo.picture.large})`}}></div> */}

        <style jsx>{`
            .profileCard {
                display: flex;
                flex-direction: column;
                width: 210px;
                margin-bottom: 15px;
                position: relative;
            }

            .profileCard--avatar {
                width: 100px;
                height: 100px;
                border: 1px solid var(--light-color);
                background: #fff;
                border-radius: 50%;
                z-index: 10;
                position: absolute;
                left: 50%;
                background-size: cover;
                background-repeat: no-repeat;
                transform: translate(-50%, 80%);
                transform-origin: 0 0;
                -webkit-box-shadow: 10px 10px 8px -15px rgba(0,0,0,0.75);
                -moz-box-shadow: 10px 10px 8px -15px rgba(0,0,0,0.75);
                box-shadow: 10px 10px 8px -15px rgba(0,0,0,0.75);
                transition: ease-in-out 150ms all;
            }

            .profileCard--image {
                flex-grow: 0;
                height: 150px;
                background-size: cover;
                background-repeat: no-repeat;
            }

            .profileCard--info {
                flex-grow: 1;
                background-color: var(--dark-color);
                color: var(--light-color);
                text-align: center;
            }

            .profileCard--info.view,
            .profileCard--info.city {
                padding-bottom: 15px;
            }

            .profileCard--info--firstName {
                margin-top: 50px;
                font-size: 25px;
                font-weight: bold;
                color: #fff;
            }

            .profileCard--info--lastName {
                color: var(--accent-color);
                font-weight: bold;
                margin-bottom: 20px;
                position: relative;
            }

            .profileCard--info--lastName::after {
                content: '';
                position: absolute;
                width: 0%;
                height: 3px;
                background-color: #fff;
                bottom: -10px;
                left: 50%;
                transform: translate(-50%, 0);
                transition: ease-in-out 150ms all;
            }

            .profileCard:hover .profileCard--info--lastName::after {
                width: 50%;
                height: 1px;
            }

            .profileCard:hover .profileCard--avatar {
                width: 104px;
                height: 104px;
                -webkit-box-shadow: 10px 10px 8px -10px rgba(0,0,0,0.75);
                -moz-box-shadow: 10px 10px 8px -10px rgba(0,0,0,0.75);
                box-shadow: 10px 10px 8px -10px rgba(0,0,0,0.75);
            }
        `}</style>
    </div>
);

export default ProfileCard;