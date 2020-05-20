import { useContext, Context } from "react";

export const useContextValue = <TContext>(contextName: string, context: Context<TContext>) => {
    const contextValue = useContext<TContext>(context);
    if (!contextValue) {
        throw new Error(`Context ${contextName} is undefined, please use it into a Provider context`);
    }
    return contextValue;
}