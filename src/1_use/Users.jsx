import { Suspense, use, useMemo } from "react";
import { delay } from "../helpers/delay";

const fetchUsers = async () => {
  await delay(2000);
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  return users.json();
};

export const UserInfo = () => {
  const fetch = useMemo(() => {
    return fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users: </h2>
      <Suspense fallback={<p>fetching users...</p>}>
        <Users fetch={fetch} />
      </Suspense>
    </div>
  );
};

const Users = ({ fetch }) => {
  const num = 5;

  let users = [];
  if (num === 5) {
    users = use(fetch);
  }

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <strong>{user.email}</strong>
            <br />
            <a href="#">{user.phone}</a>
          </div>
        );
      })}
    </div>
  );
};
