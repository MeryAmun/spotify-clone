import React, {createContext, useContext, useReducer } from 'react';


export const dataLayerContext = createContext();

export const DataLayer = ({initialState, reducer,children}) => {
<dataLayerContext.Provider value={useReducer(initialState, reducer)}>
    {children}
</dataLayerContext.Provider>
}