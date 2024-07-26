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
        <textarea name="Summary" required={true} minLength={4} maxLength={6}></textarea>
        <ErrorMessage htmlFor="Summary"/>
        <select name="Frutes" id="Frutes" required={true}>
          <option value="">Choose a frute</option>
          <option value="banana">Banana</option>
          <option value="manzana">Manzana</option>
          <option value="pera">Pera</option>
        </select>
        <ErrorMessage htmlFor="Frutes"/>
        <input type="submit" value="Send"/>
      </Form>
    </>
  )
}

export default App
