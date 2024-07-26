import { ComponentPropsWithoutRef } from "react";

interface ErrorMessageProps extends ComponentPropsWithoutRef<"label">{
    htmlFor: string
    message? : string
}

export function ErrorMessage({htmlFor, message, ...props} : ErrorMessageProps){
    return (
        message && <label htmlFor="" {...props}>{message}</label>
    )
}