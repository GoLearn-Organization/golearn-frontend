import React from 'react';
import './Reset.css'
import BlogHead from '../Blog/BlogHead/BlogHead';
import { useParams } from 'react-router-dom';

const Reset = () => {
    const {token} = useParams() 


    let [password, pfunc] = React.useState('')
    let [confirm, cfunc] = React.useState('')
    let URL = `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/resetpassword/`
    let message = document.getElementById("message")

    const handleForget = async (e) =>{
        e.preventDefault()
        let result = await fetch(`'${URL}${token}'`,{
            method:'put',
            credencials: 'include',
            body:JSON.stringify({password}),
            headers: {
                'content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.warn(result)
        console.log(result)
    }

    function validating(){
        if( confirm === password){
            message.innerHTML="Password match"
            message.style.color="green"
        }else {
            message.innerHTML="Password does not match"
            message.style.color="red"
        }
    }
    
    setTimeout(() => {
        validating()
    }, 1000);


    return(
        <>
            <BlogHead 
                title="Reset Password"
                nav1="back"
                nav2=" Login"
                link="/login"
                link2="/"
            />
            <div className="forget">
                <div className="sub-forget">
                    <p>Input your new password here</p>
                    <form>
                        {/* <label>Input New Password</label> */}
                        <input type="password" placeholder='New Password' value={password} onChange={(e) => pfunc(e.target.value)} id="password" />
                        <input type="password" placeholder='Confirm Password' id='confirm' onChange={(e) => cfunc(e.target.value)} />
                        <input className='sub' type="submit" value="Change Password" onClick={handleForget} />
                        <span id='message'></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Reset;