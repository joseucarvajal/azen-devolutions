import { GlobalSetupState } from "./global-setup.types";
import { useContextValue } from "../../shared/hooks/use-context-value-hook";
import { GlobalSetupDataContext } from "./global-setup.context";

export const useGlobalSetupState = () => 
    useContextValue<GlobalSetupState>('GlobalSetupState', GlobalSetupDataContext);
