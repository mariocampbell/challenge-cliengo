import React from "react"
import PropTypes from "prop-types"
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux"
import { removeUser } from '../../redux/actions/usersActions'
import { Link } from "react-router-dom"

import "./user.scss"

const User = ({ name, email, phone, country }) => {

  const dispatch = useDispatch()

  const handleDeleteUser = (email, name) => {
    Swal.fire({
      title: `will remove user ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUser(email))
      }     
    })
  }

  return (
    <tr className="product">
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{country}</td>
      <td>
        <Link to={`/users/${email}`} ><i className="far fa-edit"></i></Link>
        <span onClick={() => handleDeleteUser(email, name)} ><i className="far fa-trash-alt"></i></span>
      </td> 
    </tr>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
}

export default User;
