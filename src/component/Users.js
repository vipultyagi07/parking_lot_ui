import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState();
  return (
 <article>
   <h2>Users List</h2>
    {users?.length
       ? (
        <ul>
          {users.map((users, i) => <li key={i}>{user?.
          username}</li>)}
        </ul>
      ) : <p>No users to display</p>
    }
    </article>
  );
};

export default Users;
