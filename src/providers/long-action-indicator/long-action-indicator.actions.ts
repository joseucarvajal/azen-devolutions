import { 
    ActionType,
    
    START_LOADING,
    IStartLoadingParams,
    IStartLoading,
    
    STOP_LOADING,
    IStopLoadingParams,
    IStopLoading,
 } from "./long-action-indicator.types";


 export const startLoading = (payload?:IStartLoadingParams) => {
    return {
        type: START_LOADING,
        payload
    } as  IStartLoading;
 }

 export const stopLoading = (payload?:IStopLoadingParams) => {
    return {
        type: STOP_LOADING,
        payload
    } as IStopLoading;
 }