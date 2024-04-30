const Form = () => {
  const formActionHandler = async (formData) => {
    // console.log(formData.get('name'));
    // console.log(formData.get('email'));
    
    formData.forEach((value) => console.log(value))
  };
  return (
    <form action={formActionHandler}>
      <label>Form</label>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <button>Submit</button>
    </form>
  );
};

export default Form;
