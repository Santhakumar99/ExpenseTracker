import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileIcon = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const handleIconClick = () => {
    console.log("working")
    setMenuVisible(!isMenuVisible);
  };

  return (
    <div>
      <button onClick={handleIconClick} style={{ border: 'none', background: 'none' ,cursor: 'pointer'}}>
        <FontAwesomeIcon icon={faUser} style={{ fontSize: '40px', cursor: 'pointer' }} />
      </button>

      {isMenuVisible && (
        <div style={{ position: 'absolute', top: '50px', right: '10px', background: 'white', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li><Link to="/profile">View Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
