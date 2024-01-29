import React, { useEffect } from 'react';
import './style.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { FaUserCircle } from "react-icons/fa";


const Header = () => {
    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,loading]);

    const logoutFnc = () => {
        try{
            signOut(auth).then(() => {
                // Sign-out successful.
                 toast.success("Logout successful.")
                 navigate("/");
              }).catch((error) => {
                // An error happened.
                toast.error(error.message);
              });
              
        }
        catch(e){
            toast.error(e.message);
        }
    }
    
    return (
        <div className='navbar'>
              <p className='logo'>Financly.</p>
             
              {user && (
                <div className='header-right'>
                  {user.photoURL ?
                    <img src={user.photoURL}  />
                    :( <FaUserCircle className="user-icon"/>)}
                   <p className='logo link' onClick={logoutFnc}>Logout</p>
                </div>
              )}
        </div>
    );
}

export default Header;
