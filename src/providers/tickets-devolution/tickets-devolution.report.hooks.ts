import { Dispatch, SetStateAction } from "react";

import { useContextValue } from '../../shared/hooks/use-context-value-hook';

import {
  TicketDevolutionReportStateContext,
  TicketDevolutionReportActionContext
} from './tickets-devolution.report.context';
import { ITicketDevolutionReport } from "./tickets-devolution.types";

export const useTicketDevolutionReportState = () => {
  return useContextValue<ITicketDevolutionReport>(
          'TicketDevolutionReportStateContext', 
          TicketDevolutionReportStateContext);
}

export const useTicketDevolutionReportActions = () => {
  return useContextValue<Dispatch<SetStateAction<ITicketDevolutionReport>>>(
    'TicketDevolutionReportActionContext', 
    TicketDevolutionReportActionContext);
}

export const useTicketDevolutionReport = (): [ITicketDevolutionReport, Dispatch<SetStateAction<ITicketDevolutionReport>>] => {
  return [useTicketDevolutionReportState(), useTicketDevolutionReportActions()];
}