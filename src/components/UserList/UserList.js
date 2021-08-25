import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setUserList } from '../../redux/actions/usersActions';
import User from "../User/User";

import 'react-toastify/dist/ReactToastify.css';
import "./user-list.scss";

const UserList = () => {

  const dispatch = useDispatch()
  const users = useSelector( state => state.allUsers.users)

  const fetchUsers = () => {
    if (localStorage.getItem('users-list')) {
      const users = JSON.parse(localStorage.getItem('users-list'))
      dispatch(setUserList(users))
    } else {
      localStorage.setItem('users-list', JSON.stringify([]))
      dispatch(setUserList([]))
    }

  }  

  useEffect(fetchUsers, [])

  return (
    <section className="centered">
      <div className="title" >
        <h2>User list</h2>
        <Link to="/users" className="btn-secondary">Add</Link>
      </div>
      { users.length > 0 ? <table>
      <thead className="header-table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="user-list">
        { users.map((user, i) => (
            <User key={i}
              name={user.name}
              email={user.email}
              phone={user.phone}
              country={user.country}
            />
        ))}
      </tbody>
      </table>
      : <p className="not-users" >Not users found</p>
      }
    </section>
  );
};

export default UserList;
