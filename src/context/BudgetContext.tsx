import { useReducer, createContext, ReactNode, useMemo } from "react"
import { budgetReducer, initialState, BudgetState, BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: React.Dispatch<BudgetActions>
    totalExpenses: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

//Context es la accion de tener el estado global
export const BudgetContext = createContext<BudgetContextProps>(null!) //tmb puede ser "{} as BudgetContextProps"

//Provider van a ser los datos que va a tener ese context
export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}
