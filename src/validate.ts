import { CustomInputProps, EqualizeGroup, ErrorMessageDeclaration, InputError, map, messages, validationProps } from "./module";
import { VALIDATIONPROPS } from "./constants";

/**
 * Validates an input and return the first error founded
 * 
 * @param value - The currently input's value
 * @param inputData - The input's prop
 * @param customMessages - The custom messages set by the user
 * @param defaultMessages - The default messages set by the user
 * 
 * @returns The first error founded, otherwise null
 */
export async function validate(value : any, inputData : CustomInputProps, customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    for(let i = 0; i < VALIDATIONPROPS.length; i++){
        const failValidation = await isNotValid(value, inputData as map, VALIDATIONPROPS[i]);
        if(failValidation){
            const errorMessage = setMessage(value, inputData as map, VALIDATIONPROPS[i], customMessages, defaultMessages);
            const error : InputError = {name: inputData.name as string, message: errorMessage} 
            return error;
        }
    }
    return null;
}

/**
 * Validates the groups set by the prop equalize
 * 
 * @param inputData - The inputs' props
 * @param customMessages - The custom messages set by the user
 * @param defaultMessages - The default messages set by the user
 * 
 * @returns Errors for all the inputs within a group that does not match, otherwise an empty array
 */
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

/**
 * Set the message for a specified error
 * 
 * @param value - The currently input's value
 * @param inputData - The input's props
 * @param validation - The validation prop that generate the error
 * @param customMessages - The custom messages set by the user
 * @param defaultMessages - The default messages set by the user
 * 
 * @returns The message for the error founded
 */
function setMessage(value : any, inputData : map, validation : validationProps , customMessages? : Array<ErrorMessageDeclaration>, defaultMessages? : messages){
    let customMessage = customMessages?.find(input => input.name === inputData.name);
    if(customMessage && (customMessage.messages as map)[validation.name]) return (customMessage.messages as map)[validation.name] as string;
    if(defaultMessages && (defaultMessages as map)[validation.name]) return (defaultMessages as map)[validation.name] as string;
    return validation.defaultMessage(inputData.name as string, value, inputData[validation.name]);
}

/**
 * Set the message for a specified error
 * 
 * @param value - The currently input's value
 * @param inputData - The input's props
 * @param validation - The validation prop that is going to be validated
 * 
 * @returns False if the value is valid and true if the input is invalid
 */
async function isNotValid(value : any, inputData : CustomInputProps, validation : validationProps){
    if(!(inputData as map)[validation.name] || !validation.onTypes.includes(inputData.type as string)) return false;
    if(validation.name !== "custom") return validation.validationFunction(value, (inputData as map)[validation.name]);
    if(inputData.custom) return await inputData.custom(value, null);
    return false;
}