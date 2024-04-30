import { use } from "react";

const messagePromise = async () => {
  return new Promise((res) => setTimeout(res, 1000, "Hello World!"));
};

export const Message = (props) => {
  let message = "";

  if (props.show) {
    message = use(messagePromise());
  }

  return <div> {message} </div>;
};
