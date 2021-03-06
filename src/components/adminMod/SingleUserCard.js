import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserRole, fetchUsers, deleteUser } from '../../store/actions';
import styled from 'styled-components';

const StyledUser = styled.div`
  width: 45%;
  padding: 2%;
  background-color: #141414;
  margin: 2% auto;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  .user-infor-wrapper{
    display: flex;
    margin: 3% auto;
  }
  .infor-card{
    display: flex;
    flex-direction: column;
    width: 55%;
    margin-left: 3%;
    /* margin: 0 auto; */
  }
  .user-card {
    display: flex;
    width: 95%;
    flex-direction: column;
  }
  .drop-down {
    width: 97%;
    display: flex;
    margin-left: 3.2%;
    height: 35px;
    background: #2c2f33;
    color: white;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .update-role-status {
    color: black;
    padding-left: 7px;
  }

  .profile-photo {
    height: 52px;
    width: 52px;
    margin-left: 16px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.25s;
    :hover {
      opacity: 0.5;
    }
  }

  h4 {
    text-transform: capitalize;
    font-size: 1.1rem;
    font-weight: 520;
    color: #ffffff;
    margin-left: 1.5%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }

  p {
    color: #ffffff;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
    font-weight: 500;
    color: lightgrey;
    margin-left: 1%;
  }
  button {
    margin-top: 1.5%;
    margin-left: 3%;
    padding: 8px 12px;
    background-color: #212529;
    box-shadow: 2px 2px 8px #212529;
    border: 1px solid #707b7c;
    border-radius: 3px;
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem;
    color: #ffffff;
    cursor: pointer;
    transition: 0.25s;
    :hover {
      opacity: 0.5;
    }
  }
`;

const SingleUserCard = ({ user, updateUserRole, fetchUsers, deleteUser }) => {
  const [roleId, setRoleId] = useState(user.role_id);
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    updateUserRole(user.id, roleId)
      .then(() => {
        setStatus('User Role Updated');
        fetchUsers();
      })
      .catch(() => {
        setStatus('Unable To Update Role');
      });
  };

  const handleDeleteUser = () => {
    deleteUser(user.id)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledUser>
      <div className='user-card-wrapper'>
        <div className='user-infor-wrapper'>
          <img className='profile-photo' src={user.profile_picture} />
          <div className='infor-card'>
            <h4>Username - {user.display_name}</h4>
            <p>Email- {user.email}</p>
          </div>
        </div>
        <div className='user-card'>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            name='user_role'
            id='user_role'
            className='drop-down'
          >
            <option value='1'>Alumni</option>
            <option value='2'>Moderator</option>
            <option value='3'>Admin</option>
          </select>
          <button onClick={handleSubmit}>Change Role</button>
          <button onClick={handleDeleteUser}>Delete User</button>
          <span className='update-role-status'>{status}</span>
        </div>
      </div>
    </StyledUser>
  );
};

export default connect(null, { updateUserRole, fetchUsers, deleteUser })(
  SingleUserCard
);
