import React from 'react'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
      <a href="#" className="btn btn-warning" style={{ width: "100%" }} onClick={(event) => onLogoutUserClick(event)}>Logout</a>
  )
}

export default LogoutButton
