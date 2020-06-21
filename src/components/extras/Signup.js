import React, { Component } from 'react';
import {Formik, ErrorMessage} from 'formik'
import {Redirect} from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import show_noty from './Notification'
class Signup extends Component {
    state = {
        username:'',
        password:'',
        email:'',
        redirect:false
    }
    render() {
        if(this.state.redirect){
            return (<Redirect to ="/login"/>)
        }
        else{
        return (
            <div className="login">
            <div>
                <a className="hiddenanchor" id="signup" />
                <a className="hiddenanchor" id="signin" />
                <div className="login_wrapper">
                    <div className="animate form login_form">
                    <section className="login_content">
                        <Formik initialValues={this.state} validationSchema={Yup.object().shape({
                            username:Yup.string()
                            .min(1,"Username must be longer than 1 character")
                            .required("Username is required for registration"),
                            email:Yup.string()
                            .email("Email is required")
                            .required("Email is required for registration"),

                            password:Yup.string()
                            .required("please enter a password")
                            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.{8,})/,
                            "Must Contain 8 Characters,contain One Number and One alphabet at minimum"),

                        })  } onSubmit={(values,err)=>{
                            console.log(err)
                            let username=values.username
                            let password = values.password
                            let email=values.email
                            console.log(username,password)
                            let data={
                                "username":username,
                                "email":email,
                                "password":password
                            }
                            axios.post('http://45.77.150.129/signup/',data,{
                                headers:{
                                    "Content-Type":"application/json"
                                }
                            })
                            .then(res=>{
                                console.log(res)
                                if (res.status === 200){
                                    console.log(res.data)
                                    show_noty('alert','Verficication Link has been Sent to your Email')
                                    this.setState({redirect:true})
                                }
                                else{
                                    show_noty('error','The email is already registered')
                                }
                            })

                        }} >
                            {({values,handleChange,handleBlur,handleSubmit})=>(

                                                    <form onSubmit={handleSubmit}>
                                                    <h1>Signup Form</h1>
                                                    <ErrorMessage component="div" name="username" style={err}/>
                                                    <div>
                                                        <input type="text" className="form-control" name="username" placeholder="Username" required value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                                                    </div>
                                                    <ErrorMessage component="div" name="email" style={err}/>
                                                    <div>
                                                        <input type="text" className="form-control" name="email" placeholder="Email" required value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                                                    </div>
                                                    <ErrorMessage component="div" name="password" style={err}/>
                                                    <div>
                                                        <input type="password" className="form-control" name="password" placeholder="Password" required value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                                                    </div>
                                                    <div>
                                                        <button type="submit" className="btn btn-success" style={{'color':"white"}} >Sign Up</button>
                                                        <a className="reset_pass" href="#">Lost your password?</a>
                                                    </div>
                                                    <div className="clearfix" />
                                                    <div className="separator">
                                                        <p className="change_link">
                                                        <a href="/login" className="to_register"> Already Have an Account </a>
                                                        </p>
                                                        <div className="clearfix" />
                                                        <br />
                                                        <div>
                                                        <h1><i className="fa fa-paw" /> Rival Peek</h1>
                                                        <p>©2016 All Rights Reserved. Rival Peek. Privacy and Terms</p>
                                                        </div>
                                                    </div>
                                                    </form>
                            )}
                       
                        </Formik>
                    </section>
                    </div>
                    <div id="register" className="animate form registration_form">
                    <section className="login_content">
                        <form>
                        <h1>Create Account</h1>
                        <div>
                            <input type="text" className="form-control" placeholder="Username" required />
                        </div>
                        <div>
                            <input type="email" className="form-control" placeholder="Email" required />
                        </div>
                        <div>
                            <input type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div>
                            <a className="btn btn-default submit" href="index.html">Submit</a>
                        </div>
                        <div className="clearfix" />
                        <div className="separator">
                            <p className="change_link">Already a member ?
                            <button type="submit" className="btn btn-success"> Log in </button>
                            </p>
                            <div className="clearfix" />
                            <br />
                            <div>
                            <h1><i className="fa fa-paw" /> Gentelella Alela!</h1>
                            <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                            </div>
                        </div>
                        </form>
                    </section>
                    </div>
                </div>
        </div>

        </div>
        );
                            }
    }
}
const err={
    color:"red"
}
export default Signup;