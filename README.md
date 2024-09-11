# Pulido-React-Form
A library to form validation on react. Use HTML atributes to validate your forms easily. Only have to set your inputs as a Form component's children. Use ErrorMessage component to display errors.
## Use the library
Install the library with npm and you can use it. Types are include for TypeScripts developers.
```
npm i pulido-react-form
```

## Validate an input and display error message
The attribute `name` is needed to validate the input. If you want to display an error message for this input you have to create an ErrorMessage component. This component have to use the attribute `htmlFor` with the same input's name. For example:
```tsx
      <label htmlFor="Name" className="font-semibold pb-1 pt-2">
        Your name
      </label>
      <input
        type="text"
        placeholder="Luciano Pulido"
        name="Name"
        maxLength={30}
        required={true}
      />
      <ErrorMessage
        htmlFor="Name"
      />
```

## Custom messages
If you want custom error messages you use the customMessage atribute on Form component. You can custom the error message for any validation attribute.
```tsx
const messages = [
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Email",
        messages: {
            maxLength: "E-mail must not excede 50 characters"
        }
    },
    {
        name: "Subject",
        messages: {
            maxLength: "Subject must not excede 30 characters"
        }
    },
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Message",
        messages: {
            maxLength: "Message must not excede 300 characters"
        }
    }
]

export default function PortfolioForm() {
  
  return (
    <Form
      customMessages={messages}
      id="messageForm"
    >
        //...
    </Form>
```

## General message
You can display any message not attached to any input with GeneralStatus component. Use two attributes `successMessage` if the form was submmited and `errorMessage` if there was an error. You can display strings or another components.
```tsx
export default function PortfolioForm() {
  return (
    <Form>
      //...
      <GeneralStatus successMessage={<SuccessMessage/>} errorMessage={null}/>
    </Form>
  );
}

function SuccessMessage(){
  return(
    <div className="bg-green-300 my-2 p-2 w-full rounded-md text-center border-2 border-green-600">✓ Message sended successfully</div>
  )
}
```

## All validations
The library do all html validations with javascript. You can use all the following attributes, which works the same as their navigator validations:
* `required`
* `type`
* `pattern`
* `maxLength`
* `minLength`
* `max`
* `min`

But you can do even more validations. There are two extra validations.
### custom
With custom validation you can make any validation you want with a function. The function must return `true` if input is invalid.
Here you can't write `Hola` in the name input.
```tsx
function test(text : string, _ : null){
  return text === "Hola";
}

<Input type="text" name="Name" required={true} custom={test}/>
```
### equalize
Two inputs with the same string in `equalize` attribute must have the same value on sending, otherwise there will be an error.

Here `password` and `confirmPassword` must have the same value on sending.
```tsx
<Input type="password" name="Password" equalize="password" required={true} minLength={2} maxLength={30}/>
<ErrorMessage htmlFor="Password"/>
<Input type="password" name="Confirm Password" equalize="password" required={true} minLength={2} maxLength={30}/>
<ErrorMessage htmlFor="Confirm Password"/>
```

## Full example
Here an full usage example with TypeScript and Tailwind.css:

```tsx
import {ErrorMessage, Form, GeneralStatus} from "pulido-react-form"

const messages = [
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Email",
        messages: {
            maxLength: "E-mail must not excede 50 characters"
        }
    },
    {
        name: "Subject",
        messages: {
            maxLength: "Subject must not excede 30 characters"
        }
    },
    {
        name: "Name",
        messages: {
            maxLength: "Name must not excede 30 characters"
        }
    },
    {
        name: "Message",
        messages: {
            maxLength: "Message must not excede 300 characters"
        }
    }
]

export default function PortfolioForm() {
  
  function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault();
    (event.target as HTMLFormElement).reset();
  }
  
  return (
    <Form
      action=""
      className="w-full laptop:w-3/5 flex flex-col"
      customMessages={messages}
      onSubmit={handleSubmit}
      id="messageForm"
    >
      <label htmlFor="Name" className="font-semibold pb-1 pt-2">
        Your name
      </label>
      <input
        type="text"
        placeholder="Luciano Pulido"
        name="Name"
        maxLength={30}
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Name"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Email" className="font-semibold pb-1 pt-2">
        Your e-mail address
      </label>
      <input
        type="email"
        placeholder="example@example.com"
        maxLength={50}
        name="Email"
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Email"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Subject" className="font-semibold pb-1 pt-2">
        Subject
      </label>
      <input
        type="text"
        placeholder="Just the subject of your message"
        name="Subject"
        maxLength={30}
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none"
      />
      <ErrorMessage
        htmlFor="Subject"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <label htmlFor="Message" className="font-semibold pb-1 pt-2">
        Message
      </label>
      <textarea
        name="Message"
        id="Message"
        placeholder="Write your message here!"
        required={true}
        className="bg-transparent border-b-2 border-primary-light rounded-sm outline-none resize-none scroll h-32"
        maxLength={300}
      ></textarea>
      <ErrorMessage
        htmlFor="Message"
        className="text-red-500 before:content-['ⓘ_']"
      />
      <input
        type="submit"
        value="Send"
        className="mt-4 py-2 w-full bg-primary-light rounded-md text-tertiary font-semibold cursor-pointer hover:bg-primary-dark"
      />
      <GeneralStatus successMessage={<SuccessMessage/>} errorMessage={null}/>
    </Form>
  );
}

function SuccessMessage(){
  return(
    <div className="bg-green-300 my-2 p-2 w-full rounded-md text-center border-2 border-green-600">✓ Message sended successfully</div>
  )
}
```

## Next versions
I'm working on the library right now. I want to add live validation in the future. Also I want to support nested inputs, which is not a functionality yet.
