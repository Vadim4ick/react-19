import { useRef } from "react";
import { delay } from "../helpers/delay";
import { useFormStatus } from "react-dom";

export const FormStatus = () => {
  const formRef = useRef();

  const formActionHandler = async () => {
    await delay(3000);
    formRef.current.reset();
  };

  return (
    <form action={formActionHandler} ref={formRef}>
      <label>Form Status</label>
      <FormControls />
    </form>
  );
};

const FormControls = () => {
  const { pending, data, method, action } = useFormStatus();

  console.log("pending", pending);
  console.log('data?.get("name")', data?.get("name"));
  console.log("method", method);
  console.log("action?.name", action?.name);

  return (
    <>
      <input type="text" name="name" />
      <button disabled={pending}>Submit</button>

      {pending && (
        <p>
          Your data <b>{data?.get("name")} is sending...</b>
        </p>
      )}
    </>
  );
};
