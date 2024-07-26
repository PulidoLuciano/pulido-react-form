import { ErrorMessage } from "./ErrorMessage"
import { Form } from "./Form"
import { ErrorMessageDeclaration, messages } from "./module"

const customMessages : ErrorMessageDeclaration[] = [
  {
    name: "Name",
    messages: {
      required: "Hola capo. No tenes nombre?"
    }
  }
]

const defaultMessages : messages = {
  required: "Debes completar este campo"
}

function App() {
  return (
    <>
      <Form action="" customMessages={customMessages} defaultMessages={defaultMessages}>
        <label htmlFor="Name">Name</label>
        <input type="text" name="Name" required={true}/>
        <ErrorMessage htmlFor="Name"/>
        <input type="email" name="Email" required={true} minLength={2} maxLength={30}/>
        <ErrorMessage htmlFor="Email"/>
        <input type="submit" value="Send"/>
      </Form>
    </>
  )
}

export default App
