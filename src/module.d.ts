import { ComponentPropsWithoutRef } from "react"

interface map {
    [key : string] : string | undefined
}

interface validationProps{
    name : string
    validationFunction : (value : any, expected : any) => boolean | Promise<boolean>
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
    custom? : string
    equalize? : string
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
    equalize? : string
    custom? : (value : any, expected : any) => boolean | Promise<boolean>
}

export interface CustomTextareaProps extends ComponentPropsWithoutRef<"textarea">{
    equalize? : string
    custom? : (value : any, expected : any) => boolean | Promise<boolean>
}

export interface CustomSelectProps extends ComponentPropsWithoutRef<"select">{
    equalize? : string
    custom? : (value : any, expected : any) => boolean | Promise<boolean>
}

export interface InputError{
    name : string,
    message : string
}

export interface EqualizeGroup{
    groupName : string
    fields : string[]
    value : any
    error? : boolean
}