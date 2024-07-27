import { validationProps } from "./module";
import { patternMismatch, rangeOverflow, rangeUnderflow, tooLong, tooShort, typeMismatch, valueMissing } from "./validations";

export const VALIDATIONPROPS : validationProps[]= [
    {
        name: "required",
        validationFunction: valueMissing,
        defaultMessage: (name : string) => `${name} is required`,
        onTypes: ["text", "search", "url", "tel", "email", "password", "date", "month", "week", "time", "datetime-local", "number", "checkbox", "radio", "file", "textarea", "select"]
    },
    {
        name: "type",
        validationFunction: typeMismatch,
        defaultMessage: (name, _, expected) => `${name} does not seem like an ${expected}`,
        onTypes: ["email", "url"]
    },
    {
        name: "pattern",
        validationFunction: patternMismatch,
        defaultMessage: (name : string) => `${name} does not match the pattern`,
        onTypes: ["text", "tel", "email", "url", "password", "search", "textarea"]
    },
    {
        name: "maxLength",
        validationFunction: tooLong,
        defaultMessage: (name, _, expected) => `${name} must have at the most ${expected} characters`,
        onTypes: ["text", "email", "password", "search", "tel", "url", "textarea"]
    },
    {
        name: "minLength",
        validationFunction: tooShort,
        defaultMessage: (name, _, expected) => `${name} must have at least ${expected} characters`,
        onTypes: ["text", "email", "password", "search", "tel", "url", "textarea"]
    },
    {
        name: "max",
        validationFunction: rangeOverflow,
        defaultMessage: (name : string, _, expected : any) => `${name} must be lower than or equal ${expected}`,
        onTypes: ["date", "month", "week", "time", "datetime-local", "number", "range"]
    },
    {
        name: "min",
        validationFunction: rangeUnderflow,
        defaultMessage: (name : string, _, expected : any) => `${name} must be greater than or equal ${expected}`,
        onTypes: ["date", "month", "week", "time", "datetime-local", "number", "range"]
    },
    {
        name: "custom",
        validationFunction: (_, _2) => false,
        defaultMessage: (name : string, _, _2 : any) => `${name} does not complete validation`,
        onTypes: ["text", "search", "url", "tel", "email", "password", "date", "month", "week", "time", "datetime-local", "number", "checkbox", "radio", "file", "textarea", "select", "color", "range"]
    },
]