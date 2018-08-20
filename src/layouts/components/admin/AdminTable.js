import React from "react";

const AdminTable = props => {
  const { admins } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Address</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i}</th>
              <td className="font-weight-bold">{admin.address}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleOnClick(admin, i)}>
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  function handleOnClick(admin, i) {
    props.callback(admin, i);
  }
};

export default AdminTable;
