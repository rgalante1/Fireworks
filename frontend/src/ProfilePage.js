import './ProfilePage.css';
import React from 'react';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: this.props.usernamePassed,
            UserNameLooking: this.props.usernameLooking,
            CompanyName: '',
            AboutMe: 'This is my about me section.',
            JobTitle: '',
            Location: '',
            PhoneNumber: '',
            EmailAddress: '',
            ProfilePhotoURL: 'https://imgur.com/gallery/6lCeIL4',   
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="profilePage">
                <div className="profilePic">
                    <img src={ProfilePhotoURL} alt="fireworks login" height={300} width={315} />
                </div>
            </div>
        )
    }
}

function ProfilePage() {
    return (
        <div>
            <ProfilePage />
        </div>
    )
}