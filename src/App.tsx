import { ErrorMessage } from "./ErrorMessage"
import { Form } from "./Form"

function App() {
  return (
    <>
      <Form action="">
        <label htmlFor="name">Name</label>
        <input type="text" name="Name" required={true}/>
        <ErrorMessage htmlFor="Name"/>
        <input type="email" name="Email" required={true} maxLength={30}/>
        <ErrorMessage htmlFor="Email"/>
        <input type="submit" value="Send"/>
      </Form>
    </>
  )
}

export default App
