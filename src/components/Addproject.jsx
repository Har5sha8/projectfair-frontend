import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { addProjectAPI } from '../services/allAPI';
import { AddProjectResponseContext } from '../context/ContextShare';


function Addproject() {
  const {AddProjectResponse,setAddProjectResponse}=useContext(AddProjectResponseContext)
  const [projectDetails,setProjectDetails] = useState({
    title:"",
    language:"",
    github:"",
    overview:"",
    website:"",
    projectImage:""
  })
  const[token,setToken]=useState("")
  const [preview,setPreview]=useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("==projext details===");
  console.log(projectDetails);
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  const handleCloseClear=()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      overview:"",
      website:"",
      projectImage:""
    })
    setPreview("")

  
  
}
useEffect(()=>{
  if(sessionStorage.token){
    setToken(sessionStorage.getItem("token"))
  }
},[AddProjectResponse])
  const handleAdd= async(e)=>{
    e.preventDefault();
    const {title,language,github,website,overview,projectImage}=projectDetails;
    if(!title || !language || !github || !website || !overview ||!projectImage){
      alert("please fill the form completely")
    }
    else{
      console.log("===final data to upload===");
      console.log(projectDetails);
      // alert("inside insert project")
      const reqBody = new FormData();
      reqBody.append("title",title);
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)







      
      const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

      }


      const result = await addProjectAPI(reqBody,reqHeader);
      console.log("result");
      if(result.status == 200){
        setAddProjectResponse(result)
        alert("project added successfully")
        handleClose()
        handleCloseClear()

      }
      else{
        alert(result.response.data)
      }
    }
  }

  return (
   <>
  <Button variant='success' onClick={handleShow}>    Add Project</Button>
  <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6 col-md-6'>
              <label htmlFor="project-image" className='btn'>
                <input id='project-image'  type="file" style={{display:"none"}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                <img height={"200px"} width={"200px"} src={preview?preview:"data:image/png;base64,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"} alt="" />
              </label>

            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='mb-3 mt-3 w-100'>
              <input type="text" className='form-control'placeholder='Project Title'value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />

              </div>
              <div className='mb-3 mt-3 w-100'>
              <input type="text" className='form-control'placeholder='Technology used'value={projectDetails.language}  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />

              </div>
              <div className='mb-3 mt-3 w-100' >
              <input type="text" className='form-control'placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />

              </div>
              <div className='mb-3 mt-3 w-100'>
              <input type="text" className='form-control'placeholder='website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

              </div>
              <div className='mb-3 mt-3 w-100'>
              
              <textarea name="" className='form-control' placeholder='project description'id="" cols="30" rows="10" value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>

              </div>
              

            </div>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClear}>
            clear
          </Button>
          <Button variant="primary" onClick={handleAdd}>
           Add Project
          </Button>
        </Modal.Footer>
      </Modal>
   
   </>
  )
}

export default Addproject