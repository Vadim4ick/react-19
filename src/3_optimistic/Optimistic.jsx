import { Suspense, use, useState, useRef, useOptimistic, useMemo } from "react";
import { fetchUsers, addUser } from "./userApi";

const Users = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const formRef = useRef();

  const updateUsers = async (formData) => {
    const newUser = await addUser(formData.get("name"));
    setUsers((users) => [...users, newUser]);
  };

  const [optimisticUsers, addOptimisticUsers] = useOptimistic(
    users,
    (state, newUserName) => [
      ...state,
      {
        name: newUserName,
        sending: true,
      },
    ]
  );

  const formActionHandler = async (formData) => {
    addOptimisticUsers(formData.get("name"));
    formRef.current.reset();
    await updateUsers(formData);
  };

  return (
    <>
      <form action={formActionHandler} ref={formRef}>
        <input type="text" name="name" required />
        <button>Send</button>
      </form>

      <hr />

      {optimisticUsers.map((user, index) => {
        return (
          <div key={index}>
            <img src={user.avatar} style={{ width: "30px", height: "30px" }} />
            <span>{user.name}</span>

            {user.sending && <small>(updating db ...)</small>}
          </div>
        );
      })}
    </>
  );
};

const UserInit = ({ fetch }) => {
  const initialUsers = use(fetch);

  return <Users initialUsers={initialUsers} />;
};

export const Optimistic = () => {
  const fetch = useMemo(() => {
    return fetchUsers();
  }, []);

  return (
    <Suspense fallback={<p>fetching users...</p>}>
      <UserInit fetch={fetch} />
    </Suspense>
  );
};
