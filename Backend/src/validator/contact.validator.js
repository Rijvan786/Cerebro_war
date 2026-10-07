import {parsePhoneNumberFromString} from "libphonenumber-js"


export function ValidateAndFormate(contact){
    const parsed=parsePhoneNumberFromString(contact)

    if(!parsed || !parsed.isValid()) return null;

    return parsed.number;
}