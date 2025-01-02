import { ErrorMessage } from "./ErrorMessage"
import { Form } from "./Form"
import {GeneralStatus} from "./GeneralStatus"
import {Input} from "./Input"
import { ErrorMessageDeclaration, messages } from "./module"
import {Select} from "./Select"
import {Textarea} from "./Textarea"

const customMessages : ErrorMessageDeclaration[] = [
  {
    name: "Name",
    messages: {
      required: "Hola capo. No tenes nombre?",
      custom: "No puedes poner 'Hola' en este campo"
    }
  }
]

const defaultMessages : messages = {
  required: "Debes completar este campo"
}

function test(text : string, _ : null){
  return text === "Hola";
}

function App() {
  
  async function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault();
    await prueba();
  }

  async function prueba(){
    try{
      await errorFunction();
    }catch(error){
      throw error;
    }
  }

  async function errorFunction(){
    throw new Error("error");
  }
  
  return (
    <>
      <Form action="" customMessages={customMessages} defaultMessages={defaultMessages} onSubmit={handleSubmit}>
        <label htmlFor="Name">Name</label>
        <Input type="text" name="Name" required={true} custom={test}/>
        <ErrorMessage htmlFor="Name"/>
        <input type="email" name="Email" required={true} minLength={2} maxLength={30}/>
        <ErrorMessage htmlFor="Email"/>
        <Input type="password" name="Password" equalize="password" required={true} minLength={2} maxLength={30}/>
        <ErrorMessage htmlFor="Password"/>
        <Input type="password" name="Confirm Password" equalize="password" required={true} minLength={2} maxLength={30}/>
        <ErrorMessage htmlFor="Confirm Password"/>
        <Textarea name="Summary" required={true} minLength={4} maxLength={6}></Textarea>
        <ErrorMessage htmlFor="Summary"/>
        <Select name="Frutes" id="Frutes" required={true}>
          <option value="">Choose a frute</option>
          <option value="banana">Banana</option>
          <option value="manzana">Manzana</option>
          <option value="pera">Pera</option>
        </Select>
        <ErrorMessage htmlFor="Frutes"/>
        <Input type="submit" value="Send"/>
        <GeneralStatus successMessage={"Test"} errorMessage={"test error"}/>
      </Form>
    </>
  )
}

export default App
