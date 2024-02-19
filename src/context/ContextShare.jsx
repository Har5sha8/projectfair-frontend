import React, { createContext, useState } from 'react'
export const AddProjectResponseContext = createContext()
export const editProjectResponseContext = createContext();
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
    // children is a pre-defined used to share data between all components
    // create a state that need to shared
    const [AddProjectResponse,setAddProjectResponse]=useState({})
    const [editProjectResponse,setEditProjectResponse]=useState({})
    const [isAuthToken,setIsAuthToken]=useState(false)
    
  return (
    <>
    <AddProjectResponseContext.Provider  value = {{AddProjectResponse,setAddProjectResponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
        <isAuthTokenContext.Provider value={{isAuthToken,setIsAuthToken}}>
        {children}

        </isAuthTokenContext.Provider>

   
      </editProjectResponseContext.Provider>
       
       
    </AddProjectResponseContext.Provider>
    </>
  )
}

export default ContextShare