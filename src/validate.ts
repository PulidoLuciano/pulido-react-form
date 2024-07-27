import { CustomInputProps, ErrorMessageDeclaration, InputError, map, messages, validationProps } from "./module";
import { VALIDATIONPROPS } from "./constants";

export function validate(value : any, inputData : CustomInputProps, customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    for(let i = 0; i < VALIDATIONPROPS.length; i++){
        if(isNotValid(value, inputData as map, VALIDATIONPROPS[i])){
            const errorMessage = setMessage(value, inputData as map, VALIDATIONPROPS[i], customMessages, defaultMessages);
            const error : InputError = {name: inputData.name as string, message: errorMessage} 
            return error;
        }
    }
    return null;
}

function setMessage(value : any, inputData : map, validation : validationProps , customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    let customMessage = customMessages?.find(input => input.name === inputData.name);
    if(customMessage && (customMessage.messages as map)[validation.name]) return (customMessage.messages as map)[validation.name] as string;
    if(defaultMessages && (defaultMessages as map)[validation.name]) return (defaultMessages as map)[validation.name] as string;
    return validation.defaultMessage(inputData.name as string, value, inputData[validation.name]);
}

function isNotValid(value : any, inputData : CustomInputProps, validation : validationProps){
    if(!(inputData as map)[validation.name] || !validation.onTypes.includes(inputData.type as string)) return false;
    if(validation.name !== "validateFunction") return validation.validationFunction(value, (inputData as map)[validation.name]);
    if(inputData.validateFunction) return inputData.validateFunction(value, null);
    return false;
}