import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { AddProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'


function Myproject() {
    const {AddProjectResponse,setAddProjectResponse}=useContext(AddProjectResponseContext)
    const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const [userProject,setUserProject]=useState([])
    const getUserProject = async ()=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await userProjectAPI(reqHeader)
        console.log("all user project===");
        console.log(result.data);
        setUserProject(result.data)

    }
    useEffect(()=>{
        getUserProject();
    },[AddProjectResponse,editProjectResponse])
    const handleDelete = async(id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader={
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`

        }
        const result = await deleteProjectAPI(id,reqHeader);
        if(result.status===200){
            alert("project deleted succesfully")
            getUserProject();
        }


    }
  return (
   <>
   <div className='card shadow p-5 ms-3 mb-5'>
        <div className='d-flex'>
            <h3 className='text-success ms-3'> 
            My projects

            </h3>
            <div className='ms-auto'>
                <Addproject/>

            </div>

        </div>
        <div className='mt-5'>
            {
                userProject?.length>0?
                userProject.map((item)=>(
                    <div className='border d-flex align-items-center rounded p-2'>
                    <h5>{item.title}</h5>
                    <div className='ms-auto'>
                        <EditProject project={item}/>
                        <a className='btn' href={item.github}target='_blank'><i class="fa-brands fa-github text-success"></i></a>
                        <button className='btn'><i class="fa-solid fa-trash text-danger" onClick={(e)=>handleDelete(item._id)}></i></button>
    
                    </div>
    
                </div>

                )):
                <p className='text-danger fw-bolder fs-5 mt-3'>No project Uploaded yet</p>

            }
           
            
        </div>
        
    </div>
   </>
  )
}

export default Myproject