import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { allprojectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken,setIsToken]=useState(false);
  const [searchKey,setSearchKey]=useState((""))
  const[allprojects,setAllProjects]=useState([])
  const getAllProject = async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader={
       "Content-Type":"application/json",
       "Authorization": `Bearer ${token} `
      }
      const result = await allprojectAPI(searchKey,reqHeader);
      console.log(result.data);
      setAllProjects(result.data)
    }
  }
    useEffect(()=>{
      getAllProject()
    },[searchKey])
    console.log(searchKey);
    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setIsToken(true)
      }
    },[])
    console.log("searchkey",searchKey);
  
  return (
   <>
   <Header/>
   <div className='d-flex justify-content-center align-items-center mt-5 flex-column'>
    <h3>All Projects</h3>
    <div className={'d-flex mt-5 w-25'}>
      <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control' placeholder='search project using technology' />
      <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:"-40px",color:"lightblue"}}></i>
    </div>

   </div>
   <Row className='mt-5 mb-5 ms-5'>
    
      {
        allprojects?.length>0?
        allprojects.map((item)=>(
          <Col md={6} lg={4}>
          
    <Projectcards project={item}/>
    </Col>

        )):
        <div>
          {
            isToken?
            <p>no project uploaded yet</p>:
            <div className='d-flex justify-content-center align-items-center'>
              <img src="data:image/png;base64,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" alt="" />
              <div>
              <p className='text-danger '>please
              <Link style={{textDecoration:"none",color:"blue"}}to={'/login'}>Login
              </Link>to view projects
              </p>
              </div>
              
            </div>
          }
        </div>
        
      
      }
    
   </Row>
   </>
  )
}

export default Project