import React from 'react'
import PropTypes from "prop-types"
import "./message-error.scss"

const MessageError = ({ name }) => {
  return (
    <p className="message-error" >{name} is required</p>
  )
}

MessageError.propTypes = {
  name: PropTypes.string.isRequired
}

export default MessageError
