import React from 'react';

import './style.css';

import DefaultImage from '../../img/default-profile-picture.png';


const ProfilePicture = (props) => {
  return (
    <div className="profile-picture-wrapper">
      <img 
        className={"profile=picture " + props.className} 
        src={props.src || DefaultImage}
        alt="profile picture"
      />
    </div>
  );
}


export default ProfilePicture;