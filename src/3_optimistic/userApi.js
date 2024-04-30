import { delay } from "../helpers/delay";

const USER_ENDPOINT = "https://65ec69440ddee626c9b03358.mockapi.io/users";

export const fetchUsers = async () => {
  const users = await fetch(USER_ENDPOINT);
  return users.json();
};

export const addUser = async (name) => {
  await delay(1500);

  const body = JSON.stringify({ name });

  const newUser = await fetch(USER_ENDPOINT, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
  });

  return newUser.json();
};
