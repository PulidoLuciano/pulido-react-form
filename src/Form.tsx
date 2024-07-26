import { Children, ComponentPropsWithoutRef, isValidElement, JSXElementConstructor, ReactNode, useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import type { CustomFormProps, InputError } from "./module.d.ts";
import { validate } from "./validate.ts";

export function Form({customMessages, defaultMessages, children, onSubmit,...props} : CustomFormProps){    
    
    let inputsData : Array<ComponentPropsWithoutRef<"input">> = [];
    const [errors, setErrors] = useState<InputError[]>([]);
    
    function handleSubmit(event : React.SyntheticEvent<HTMLFormElement>){ 
        let newErrors : InputError[] = [];
        inputsData.forEach((input : ComponentPropsWithoutRef<"input">) => {
            if(!input.name) return;
            const inputError = validate((event.target as HTMLFormElement)[input.name].value, input, customMessages, defaultMessages);
            if(inputError) newErrors.push(inputError);
        });
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
                switch(elementType){
                    case "input": 
                        newProps = {id: props.name, name: props.id, ...props};
                        if(newProps.id || newProps.name) inputsData.push({...props});
                        return <input {...newProps}/>;
                    case "ErrorMessage":
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