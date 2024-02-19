import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './App.css';
import bgImage from '../src/assets/Images/bgImage.jpeg';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [formValues, setFormValues] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
   
  };


  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);




  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh', backgroundColor: '#2a373d' }}>
        <div className="container w-50">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="text-center fw-bold fs-3 mb-2 text-light">
              Signup successful! <i class="fa-solid fa-check text-light ms-2"></i>
            </div>
          ) :
            (console.log("Entered Details", formValues))
          }
          <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', padding: '70px' }} className='card shadow img-fluid'>

            <div className=" align-items-center" >
              <h1 className='mb-3 text-light text-center'>gratafy</h1>
              <Form className='w-100 ' onSubmit={handleSubmit} >
                <Form.Group className="mb-3 text-light"  >
                  <Form.Label>Username </Form.Label>
                  <Form.Control className='bg-transparent text-white' type="text" value={formValues.username} onChange={e => setFormValues({ ...formValues, username: e.target.value })} />
                  <p>{formErrors.username}</p>
                </Form.Group>

                <Form.Group className="mb-3 text-light">
                  <Form.Label>Email </Form.Label>
                  <Form.Control className='bg-transparent text-white' type="email" value={formValues.email} onChange={e => setFormValues({ ...formValues, email: e.target.value })} />
                  <p>{formErrors.email}</p>
                </Form.Group>
                <Form.Group className="mb-3 text-light" >
                  <Form.Label>Password </Form.Label>
                  <Form.Control className='bg-transparent text-white' type="password" value={formValues.password} onChange={e => setFormValues({ ...formValues, password: e.target.value })} />
                  <p>{formErrors.password}</p>
                </Form.Group>
                <Form.Group className="mb-3 text-light">
                  <Form.Label>Confirm Password </Form.Label>
                  <Form.Control className='bg-transparent text-white' type="password" value={formValues.confirmPassword} onChange={e => setFormValues({ ...formValues, confirmPassword: e.target.value })} />
                  <p>{formErrors.confirmPassword}</p>
                </Form.Group>
                <Form.Group className="mb-3 text-end">
                  <button style={{ backgroundColor: '#2a373d', color: 'white' }} className='btn'>Sign up</button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default App;
