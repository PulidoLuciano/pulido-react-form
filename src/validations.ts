export function valueMissing(value : any, expected : any){
    return (!value && !(value === 0)) === expected;
}

export function tooLong(value : any, expected : any){
    return value.length > expected
}

export function tooShort(value : any, expected : any){
    return value.length < expected && value.length != 0
}

export function rangeOverflow(value : any, expected : any){
    return value > expected
}

export function rangeUnderflow(value : any, expected : any){
    return value < expected
}

export function typeMismatch(value : any, expected : any){
    if(expected === "email") return String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null;
    if(expected === "url") return String(value).match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/) == null;
    return false;
}

export function patternMismatch(value : any, expected : any){
    return String(value).match(expected) == null;
}