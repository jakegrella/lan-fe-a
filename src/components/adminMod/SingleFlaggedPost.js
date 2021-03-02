import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchFlaggedPosts, archivePost, resolvePost } from '../../store/actions';
import { Link } from 'react-router-dom';

const StyledRoom = styled.div`
  padding: 2.8%;
  background-color: #141414;
  margin: 1.2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 12px;
  h4 {
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
  }
  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: lightgrey;
  }
  .editable {
    display: flex;
    flex-direction: column;
    margin-top: 2.2%;
    margin-bottom: 2%;
  }
  .input-wrap {
    padding: 2%;
    margin: -4%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    border: none;
    /* width: 40%; */
    input {
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
    }
    textarea {
      margin-left: 2%;
      min-height: 44px;
      min-width: 100%;
      max-width: 100%;
      /* height: 288px; */
      padding: 10px;
      background-color: #242323;
      border: 1px solid #808080;
      border-radius: 5px;
      font-family: 'Nunito', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      color: #808080;

      ::placeholder {
        color: dimgray;
      }
    }
  }
  .button-wrap {
    margin-bottom: 2.8%;
  }
  button {
    margin-top: 1.5%;
    margin-right: 3%;
    padding: 8px 12px;
    background-color: #212529;
    box-shadow: 2px 2px 8px #212529;
    border: 1px solid #707b7c;
    border-radius: 5px;
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

const SingleFlaggedPost = (props) => {
  const { post } = props;

  const handleResolvePost = (id) => {
    props.resolvePost(id)
      .then(() => {
        props.fetchFlaggedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleArchivePost = (id) => {
    props.archivePost(id)
      .then(() => {
        props.fetchFlaggedPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <StyledRoom>
      <div className="not-editable">
        <h4>{post.title}</h4>
        <Link to={`/post/${post.id}`}>Click Here To See Original Post</Link>
        <p>{post.description}</p>
        <button onClick={() => handleResolvePost(post.id)}>Accept Post</button>
        <button onClick={() => handleArchivePost(post.id)}>Delete Post</button>
      </div>
    </StyledRoom>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchFlaggedPosts,
  archivePost,
  resolvePost,
})(SingleFlaggedPost);
