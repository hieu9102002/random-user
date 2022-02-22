import React from "react";

const Users = ({ users, loading }) => {
  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <div>
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Thumbnail Icon</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name.title + " " + user.name.first + " " + user.name.last}</td>
              <td>{user.login.username}</td>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
