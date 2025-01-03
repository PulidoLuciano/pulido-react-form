import { Children, isValidElement, JSXElementConstructor, ReactNode, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { CustomFormProps, CustomInputProps, InputError } from "./module.d.ts";
import { validate, validateGroups } from "./validate.ts";
import { GeneralStatusProps } from "./GeneralStatus.tsx";

export function Form({customMessages, defaultMessages, children, onSubmit,...props} : CustomFormProps){    
    
    //Array that stores all the data of the inputs parsed
    let inputsData : Array<CustomInputProps> = [];
    //State that stores all the errors found during validation
    const [errors, setErrors] = useState<InputError[]>([]);
    //Indicate if the form was submitted before
    const [submitted, setSubmitted] = useState<boolean>(false);
    //Error message from the user onSubmit
    const [onSubmitError, setOnSubmitError] = useState<any | null>(null);
    
    async function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){ 
        event.preventDefault(); // Prevent form submission initially
        let newErrors : InputError[] = [];
        //Iterate inputs and validate each one
        for(const input of inputsData){
            if(!input.name) break;
            input.value = (event.target as HTMLFormElement)[input.name].value
            const inputError = await validate(input.value, input, customMessages, defaultMessages);
            if(inputError) newErrors.push(inputError);
        }
        //Validate equalize groups
        newErrors = newErrors.concat(validateGroups(inputsData, customMessages, defaultMessages));
        //If there are errors, prevent form submission
        if(!(newErrors.length == 0)){
            setErrors(newErrors);
            return;
        }
        //Execute custom onSubmit and send
        try {
            if(onSubmit) await onSubmit(event);
            setOnSubmitError(null);
        } catch (error : any) {
            setOnSubmitError(error);
        }
        setSubmitted(true);
        setErrors(newErrors);
    }

    return(
        <form action="" onSubmit={handleSubmit} {...props} noValidate={true}>
            {Children.map<ReactNode, ReactNode>(children, (child) => {
                if(!isValidElement(child)) return child;
                let {props, type} = child;
                //Get label type
                let elementType = ((type as JSXElementConstructor<any>).name) ? (type as JSXElementConstructor<any>).name : type;
                let newProps;
                //Render component according to elementType
                switch((elementType as string).toLowerCase()){
                    case "input": 
                        //Equalize name and id props
                        newProps = {id: props.name, name: props.id, ...props};
                        //If component have name add the data for validation
                        if(newProps.id || newProps.name) inputsData.push({...props});
                        //Render the component with all his props
                        return <input {...newProps}/>;
                    case "errormessage":
                        return <ErrorMessage message={errors.find(error => error.name === props.htmlFor)?.message} htmlFor={props.htmlFor} {...props}/>;
                    case "textarea":
                        newProps = {id: props.name, name: props.id, type: "textarea", ...props}
                        inputsData.push(newProps);
                        return <textarea {...props}></textarea>;
                    case "select":
                        newProps = {id: props.name, name: props.id, type: "select", ...props}
                        inputsData.push(newProps);
                        return <select {...props}/>;
                    case "generalstatus":
                        if(!submitted) return null;
                        if(errors.length === 0 && !onSubmitError) return (props as GeneralStatusProps).successMessage;
                        else return (props as GeneralStatusProps).errorMessage;
                    default:
                        return child;
                }
            })}
        </form>
    )
}