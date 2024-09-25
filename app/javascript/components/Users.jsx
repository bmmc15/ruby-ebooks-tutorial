import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from "../utils/constants";
import { ApiClient } from "../services";
const Users = () => {
  const [users, setUsers] = useState([]);

  const { isLoading } = useQuery(USERS_QUERY_KEY, ApiClient.fetchUsers, {
    onSuccess: (data) => {
      console.log("First Rails useQuery sucessful:", data);
      setUsers(data);
    },
  });

  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Users</h1>
          <p className="lead">A list of all the users.</p>
          <hr className="my-4" />
          <Link
            to="/exercises"
            className="btn btn-lg custom-button"
            role="button"
          >
            Users
          </Link>

          {users &&
            users.map((elem, idx) => {
              return <div key={idx}>{elem.username}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default Users;
