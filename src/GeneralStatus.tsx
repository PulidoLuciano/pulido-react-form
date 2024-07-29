import { ReactNode } from "react";

export interface GeneralStatusProps{
    successMessage : ReactNode
    errorMessage : ReactNode
}

export function GeneralStatus({successMessage, errorMessage} : GeneralStatusProps){
    successMessage;
    errorMessage;
    return null;
}