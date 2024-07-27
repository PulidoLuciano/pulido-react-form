import { Children, isValidElement, JSXElementConstructor, ReactNode, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { CustomFormProps, CustomInputProps, InputError } from "./module.d.ts";
import { validate, validateGroups } from "./validate.ts";

export function Form({customMessages, defaultMessages, children, onSubmit,...props} : CustomFormProps){    
    
    let inputsData : Array<CustomInputProps> = [];
    const [errors, setErrors] = useState<InputError[]>([]);
    
    function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){ 
        let newErrors : InputError[] = [];
        inputsData.forEach((input : CustomInputProps) => {
            if(!input.name) return;
            input.value = (event.target as HTMLFormElement)[input.name].value
            const inputError = validate(input.value, input, customMessages, defaultMessages);
            if(inputError) newErrors.push(inputError);
        });
        newErrors = newErrors.concat(validateGroups(inputsData, customMessages, defaultMessages));
        if(!(newErrors.length == 0)){
            event.preventDefault();
        }else{
            if(onSubmit) onSubmit(event);
        }
        setErrors(newErrors);
    }

    return(
        <form action="" onSubmit={handleSubmit} {...props} noValidate={true}>
            {Children.map<ReactNode, ReactNode>(children, (child) => {
                if(!isValidElement(child)) return child;
                let {props, type} = child;
                let elementType = ((type as JSXElementConstructor<any>).name) ? (type as JSXElementConstructor<any>).name : type;
                let newProps;
                switch((elementType as string).toLowerCase()){
                    case "input": 
                        newProps = {id: props.name, name: props.id, ...props};
                        if(newProps.id || newProps.name) inputsData.push({...props});
                        return <input {...newProps}/>;
                    case "errormessage":
                        return <ErrorMessage message={errors.find(error => error.name === props.htmlFor)?.message} for={props.htmlFor} {...props}/>;
                    case "textarea":
                        newProps = {id: props.name, name: props.id, type: "textarea", ...props}
                        inputsData.push(newProps);
                        return <textarea {...props}></textarea>;
                    case "select":
                        newProps = {id: props.name, name: props.id, type: "select", ...props}
                        inputsData.push(newProps);
                        return <select {...props}/>;
                    default:
                        return child;
                }
            })}
        </form>
    )
}