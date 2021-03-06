import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../store/actions';
import Sidebar from '../common/Sidebar';
import RoomCard from './RoomCard';
import styled from 'styled-components';

const RoomWrapper = styled.div`
  display: flex;
`;

const RoomsContainer = styled.div`
  width: 98%;
  flex-wrap: wrap;
  justify-content: center;
  .no-posts-found {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 64px 0;
      font-size: 1rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      i {
        margin-right: 8px;
        font-size: 0.875rem;
      }
    }
  }
  .youve-reached-the-end {
    font-size: 1rem;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
  }
  @media (min-width: 768px) {
    width: 95%;
  }
  @media (min-width: 1024px) {
    width: 972.8px;
  }
`;

const StyledPointer = styled.div`
  display: flex;
  width: 67%;
  margin: 1.5% 20% 1.5% 17%;
  align-items: center;
  background-color: #141414;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  border-radius: 10px;
  height: 8vh;
  h1 {
    font-size: 1.9rem;
  }
  .single-room-name {
    /* margin-top: 1.5%;
    margin-left: 1.2%; */
    font-weight: 600;
    margin: 1.5% 0% 1.5% 1.2%;
  }
`;

const StyledRoomContainer = styled.div`
  width : 90%;
  padding: 2%;
  .single-room-name {
    color: white;
  }
`;

const AllRoomsBody = (props) => {
  useEffect(() => {
    props.fetchRooms();
  }, []);

  return (
    <RoomWrapper>
      <Sidebar />
      <StyledRoomContainer>
        <StyledPointer>
          <h1 className="single-room-name">Rooms Dashboard</h1>
        </StyledPointer>
        <RoomsContainer>
          {props.rooms.length > 0 ? (
            props.rooms.map((item, index) => <RoomCard key={index} room={item} />)
          ) : (
            <div className="no-posts-found">
              <p>
                <i className="fas fa-exclamation"></i>No Rooms found
              </p>
            </div>
          )}
        </RoomsContainer>
      </StyledRoomContainer>
    </RoomWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, { fetchRooms })(AllRoomsBody);
