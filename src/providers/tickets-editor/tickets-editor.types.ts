export interface ITicketsEditorState {
    codigoTicketToEdit:string;
}

export const SET_CODIGO_TICKET_TO_EDIT = 'SET_CODIGO_TICKET_TO_EDIT';

export type ITicketEditorAction = 
    | { type: typeof SET_CODIGO_TICKET_TO_EDIT, codigo:string }