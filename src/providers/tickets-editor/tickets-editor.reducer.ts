import {
    ITicketsEditorState,
    ITicketEditorAction,
    SET_CODIGO_TICKET_TO_EDIT
} from "./tickets-editor.types";

export const ticketsEditorReducer = (state: ITicketsEditorState, action: ITicketEditorAction): ITicketsEditorState => {

    switch (action.type) {
        case SET_CODIGO_TICKET_TO_EDIT:
            return {
                codigoTicketToEdit: action.codigo
            };

        default:
            return state;
    }
}