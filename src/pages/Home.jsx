import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Projectcards from '../components/Projectcards'
import { Link } from 'react-router-dom'
import homepageImage from '../assets/image3.jpeg'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
    // we need to change get starte button to manage projects,id useer logged in
    const [ homeProject,setHomeProject]=useState([])
     const [isLogin,setIsLogin]=useState(false)
     useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(true)
         }

     },[])
     const getHomeProject = async()=>{
        const result = await homeProjectAPI()
        console.log("===home projects===");
        console.log(result);
        setHomeProject(result.data)
     }
     useEffect(()=>{
        getHomeProject();
     },[])
  
    return (
        <>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh", backgroundColor: "yellowgreen" }}>
                <div className='container-fluid rounded'>
                    <Row className='align-items-center p-5'>
                        <Col sm={12} md={6} lg={6}>
                            <h1 className='text-light mb-3' style={{fontFamily:"-moz-initial",fontSize:"50px",fontWeight:"600"}}>
                                Project Fair
                            </h1>
                            <p>
                               One stop destination for all software development projects 
                            </p>
                            {
                                isLogin == true ?
                                <Link to={'/Dashboard'}>
                            <button className='btn btn-success rounded'>Manage Project<i class="fa-solid fa-arrow-right"></i></button>
                            </Link>:
                            <Link to={'/login'}>
                            <button className='btn btn-success rounded'>Get Started<i class="fa-solid fa-arrow-right"></i></button>
                            </Link>
                            }
                            
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <img src={homepageImage} alt="" height={"300px"} style={{marginTop:"80px"}}/>
                            
                        </Col>
                    </Row>

                </div>
            </div>


            <div className='mt-5 allProjects'>
                <div className='text-center'>
                    <h2 style={{fontFamily:"-moz-initial"}}>Explore our project </h2>
                    <div className=''>
                        <marquee scrollAmount={20}>
                            <div className='d-flex'>
                                {
                                    homeProject?.length > 0 ?
                                    homeProject.map((item)=>(
                                        <div className='ms-5' style={{ width: "400px"}}>
                                            <Projectcards project={item}/>

                                        </div>
                                    )):
                                    <p>no projects found</p>

                                }

                            </div>
                       
                        </marquee>
                        

                    </div>
                    <div className='text-center mt-5' style={{fontWeight:"600px",color:"red",cursor:"pointer"}}>
                        <Link to={'/Project'}>SEE MORE</Link>
                        

                    </div>

                </div>

            </div>
        </>
    )
}

export default Home