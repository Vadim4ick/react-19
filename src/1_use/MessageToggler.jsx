import { Suspense, useState } from "react";
import { Message } from "./Message";

export const MessageToggler = () => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <button onClick={() => setShowMessage(!showMessage)}>
        show/hide message
      </button>

      <Suspense fallback={<p>waiting for message...</p>}>
        <Message show={showMessage}/>
      </Suspense>
    </div>
  );
};
