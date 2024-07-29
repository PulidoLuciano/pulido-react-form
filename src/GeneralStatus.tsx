import { ReactNode } from "react";

export interface GeneralStatusProps{
    successMessage : ReactNode
    errorMessage : ReactNode
}

export default function GeneralStatus({successMessage, errorMessage} : GeneralStatusProps){
    successMessage;
    errorMessage;
    return null;
}