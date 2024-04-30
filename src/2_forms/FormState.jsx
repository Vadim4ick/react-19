import { useFormState } from "react-dom";

const QUESTIONS = [
  { id: 1, text: "1 + 1", answer: "2" },
  { id: 2, text: "7 * 7", answer: "49" },
];

const formActionHandler = async (prevState, formData) => {
  console.log("prevState ", prevState);
  console.log("formData ", formData);

  const newState = {
    q1: formData.get("question1") === QUESTIONS[0].answer,
    q2: formData.get("question2") === QUESTIONS[1].answer,
  };

  return newState;
};

export const FormQuiz = () => {
  const [formState, formAction] = useFormState(formActionHandler, null);

  const infoQ1 = formState?.q1 ? "1) Correct" : "1) Wrong!";
  const infoQ2 = formState?.q2 ? "2) Correct" : "2) Wrong!";

  const isCompleted = formState?.q1 && formState?.q2;

  return (
    <div>
      <form action={formAction}>
        <label>Quiz</label>

        <label htmlFor="q1">{QUESTIONS[0].text}</label>
        <input type="text" name="question1" id="q1" />

        <label htmlFor="q2">{QUESTIONS[1].text}</label>
        <input type="text" name="question2" id="q2" />

        <button>Check</button>
      </form>

      {formState !== null && !isCompleted && (
        <>
          <p>{infoQ1}</p>
          <p>{infoQ2}</p>
        </>
      )}

      {isCompleted && <strong>WELL DONE !!!</strong>}
    </div>
  );
};
