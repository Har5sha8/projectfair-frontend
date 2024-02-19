import React from 'react'
import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='card shadow p-5 mb-5'>
        <div className='d-flex justify=content-between'>
          <h2>Profile</h2>
          <button className='btn btn-outline-info ms-5' onClick={() => setOpen(!open)}><i class="fa-solid fa-angle-down"></i>


          </button>

        </div>
        <Collapse in={open}>
        <div className='row justify-content-center mt-5'>
          <label htmlFor="profile" className='mb-5'>
            <input type="file" id='profile' style={{ display: 'none' }} />
            <img width={"150px"}
              height={"150px"} className='rounded' src="https://www.clipartmax.com/png/small/214-2143742_individuals-whatsapp-profile-picture-icon.png" alt="" />

          </label>
          <div className='mb-4'>
            <input type="text" name='' id="" placeholder='github link' className='form-control' />

          </div>
          <div>
            <input type="text" name='' id='' placeholder='Linkedin Link' className='form-control' />
          </div>
          <div className='mt-3 mb-1'>
            <button className='btn btn-success rounded w-100 '>Update</button>

          </div>

        </div>

        </Collapse>
       

      </div>
    </>
  )
}

export default Profile