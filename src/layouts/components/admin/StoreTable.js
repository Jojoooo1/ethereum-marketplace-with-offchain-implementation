import React from "react";

const StoreTable = props => {
  const { stores } = props;

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Address</th>
          <th scope="col">Approved</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stores.map((store, i) => {
          return (
            <tr key={i}>
              <th scope="row">{store.id}</th>
              <td className="font-weight-bold">{store.address}</td>
              {store.approved ? (
                <td>
                  <span className="badge badge-pill badge-success badge-approval">Approved</span>
                </td>
              ) : (
                <td>
                  <span className="badge badge-pill badge-secondary badge-approval">Not approved</span>
                </td>
              )}
              <td>
                {!store.approved && (
                  <button className="btn btn-success btn-sm m-1" onClick={() => handleOnClickApprove(store.address)}>
                    Approve
                  </button>
                )}
                <button className="btn btn-danger btn-sm m-1" onClick={() => handleOnClickRemove(store.address)}>
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  function handleOnClickRemove(address) {
    props.callbackRemoveStore(address);
  }
  function handleOnClickApprove(address) {
    props.callbackApproveStore(address);
  }
};

export default StoreTable;
