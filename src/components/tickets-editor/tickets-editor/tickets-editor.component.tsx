import * as React from "react";

import "./tickets-editor.style.scss";

import TicketsEditorProvider from "../../../providers/tickets-editor/tickets-editor.context";
import TicketsEditorMain from "../tickets-editor-main/tickets-editor-main.component";

interface IProps {
  show: boolean;
  hide: () => void;
}
const TicketsEditor: React.FC<IProps> = (props) => {
  return (
    <TicketsEditorProvider>
      <TicketsEditorMain {...props}></TicketsEditorMain>
    </TicketsEditorProvider>
  );
};

export default TicketsEditor;
