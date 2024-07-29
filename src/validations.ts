/**
 * Verifies if the input it's not filled
 * @param value - Current input's value
 * @param expected - A boolean indicating if is necessary to fill the input
 * @returns False if the input value is valid, true otherwise 
 */
export function valueMissing(value : any, expected : any){
    return (!value && !(value === 0)) === expected;
}

/**
 * Verifies if the input length is too long
 * @param value - Current input's value
 * @param expected - A number indicating the maximum length expected
 * @returns False if the input value is valid, true otherwise 
 */
export function tooLong(value : any, expected : any){
    return value.length > expected
}

/**
 * Verifies if the input length is too short
 * @param value - Current input's value
 * @param expected - A number indicating the minimum length expected
 * @returns False if the input value is valid, true otherwise 
 */
export function tooShort(value : any, expected : any){
    return value.length < expected && value.length != 0
}

/**
 * Verifies if the input value is higher than expected
 * @param value - Current input's value
 * @param expected - A number indicating the maximum possible value
 * @returns False if the input value is valid, true otherwise 
 */
export function rangeOverflow(value : any, expected : any){
    return value > expected
}

/**
 * Verifies if the input value is lower than expected
 * @param value - Current input's value
 * @param expected - A number indicating the minimum possible value
 * @returns False if the input value is valid, true otherwise 
 */
export function rangeUnderflow(value : any, expected : any){
    return value < expected
}

/**
 * Verifies if the input value matches its type
 * @param value - Current input's value
 * @param expected - A string indicating the type of the input
 * @returns False if the input value is valid, true otherwise 
 */
export function typeMismatch(value : any, expected : any){
    if(expected === "email") return String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null;
    if(expected === "url") return String(value).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/) == null;
    return false;
}

/**
 * Verifies if the input value matches the specified pattern
 * @param value - Current input's value
 * @param expected - A string indicating the pattern to match
 * @returns False if the input value is valid, true otherwise 
 */
export function patternMismatch(value : any, expected : any){
    return String(value).match(expected) == null;
}