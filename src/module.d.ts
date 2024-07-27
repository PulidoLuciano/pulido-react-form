import { ComponentPropsWithoutRef } from "react"

interface map {
    [key : string] : string | undefined
}

interface validationProps{
    name : string
    validationFunction : (value : any, expected : any) => boolean
    defaultMessage : (name : string, value? : any, expected? : any) => string
    onTypes : string[]
}

interface messages{
    maxLength? : string
    minLength? : string
    pattern? : string
    max? : string
    min? : string
    required? : string
    validateFunction? : string
}

interface ErrorMessageDeclaration{
    name : string
    messages: messages
}

export interface CustomFormProps extends ComponentPropsWithoutRef<"form">{
    customMessages? : Array<ErrorMessageDeclaration>
    defaultMessages? : messages
    onSubmit? : (event : React.SyntheticEvent<HTMLFormElement>) => void
}

export interface CustomInputProps extends ComponentPropsWithoutRef<"input">{
    equalGroup? : string
    validateFunction? : (value : any, expected : any) => boolean
}

export interface CustomTextareaProps extends ComponentPropsWithoutRef<"textarea">{
    equalGroup? : string
    validate? : (value : any, expected : any) => boolean
}

export interface CustomSelectProps extends ComponentPropsWithoutRef<"select">{
    equalGroup? : string
    validate? : (value : any, expected : any) => boolean
}

export interface InputError{
    name : string,
    message : string
}