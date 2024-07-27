import { CustomInputProps, EqualizeGroup, ErrorMessageDeclaration, InputError, map, messages, validationProps } from "./module";
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

export function validateGroups(inputsData : CustomInputProps[], customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    let equalizeGroups : EqualizeGroup[] = [];
    let errors : InputError[] = [];
    
    inputsData.forEach(inputData => {
        if(!inputData.name) return;
        if(inputData.equalize){
            const group = equalizeGroups.find(g => g.groupName === inputData.equalize);
            if(group) group.fields.push(inputData.name);
            else equalizeGroups.push({groupName: inputData.equalize, fields: [inputData.name], value: inputData.value});
        }
    });

    equalizeGroups.forEach(group => {
        group.fields.forEach(field => {
            const fieldData = inputsData.find(input => field === input.name);
            if(!fieldData) return;
            if(fieldData.value === group.value || group.error) return;
            group.error = true;
        });
        if(!group.error) return;
        group.fields.forEach(field => {
            let customMessage = customMessages?.find(input => input.name === field)?.messages.equalize;
            errors.push({name: field, message: ((customMessage) ? customMessage : (defaultMessages?.equalize) ? defaultMessages.equalize : `${field} is not equal to its group`)});
        });
    });
    return errors;
}

function setMessage(value : any, inputData : map, validation : validationProps , customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    let customMessage = customMessages?.find(input => input.name === inputData.name);
    if(customMessage && (customMessage.messages as map)[validation.name]) return (customMessage.messages as map)[validation.name] as string;
    if(defaultMessages && (defaultMessages as map)[validation.name]) return (defaultMessages as map)[validation.name] as string;
    return validation.defaultMessage(inputData.name as string, value, inputData[validation.name]);
}

function isNotValid(value : any, inputData : CustomInputProps, validation : validationProps){
    if(!(inputData as map)[validation.name] || !validation.onTypes.includes(inputData.type as string)) return false;
    if(validation.name !== "custom") return validation.validationFunction(value, (inputData as map)[validation.name]);
    if(inputData.custom) return inputData.custom(value, null);
    return false;
}