import React, { useState } from 'react';
import './styles.css';
import Input from '../Inputs';
import Button from '../Button';
import { GoogleAuthProvider, createUserWithEmailAndPassword , signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth , db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupSigninComponent = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [Loading,setLoading]=useState(false);
    const [loginForm,setLoginForm]=useState(false);
    const navigate=useNavigate();

    const signupWithEmail = async () => {
      setLoading(true);
  if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
    if(password==confirmPassword){
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("user-", user);
        toast.success("user created!");
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/dashboard");
        createDoc(user);
        // Create a doc with user id 


      } catch (error) {
        const errorCode = error.code;
        // console.log(errorCode, error.message);
        toast.error(error.message);
        setLoading(false);
      }
    }
    else{
      toast.error("Password should be match!");
      setLoading(false);
    }
  }
  else{
    toast.error("Please fill all the fields");
    setLoading(false);
  }
};
 const loginUsingEmail=()=>{
   setLoading(true);
   if(email!=="" && password!==""){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("user logged in successfully");
      console.log("user=>",user)
      setLoading(false);
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
    });
   }
   else{
    toast.error("All fields are required!");
   }
 } 

 const createDoc=async (user)=>{
//  make sure the doc with the user id is not exist.
    setLoading(true);
    if(!user)return;

    const userRef=doc(db,"users",user.uid);
    const userData=await getDoc(userRef);
    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name:user.displayName?user.displayName:name,
          email:user.email,
          photoURL:user.photoURL?user.photoURL:"",
          createdAt: new Date(),
        })
        toast.success("Doc created.");
        setLoading(false);
      }
      catch(e){
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      // toast.error("Doc has already existed.");
      setLoading(false);
    }
       
 }
 
 const googleAuth=()=>{
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log("user==",user);
        createDoc(user);
        setLoading(false);
        toast.success("user logged in successfully");
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false);
      });
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
 }


    return (
        <>
          {loginForm ? <div className='signup-wrapper'>
            <h2 className='title'>
                Login  <span style={{color:"var(--theme)"}}>Financly.</span>
            </h2>
            <form>
              
                <Input
                  type="email"
                  label={"Email"}
                  state={email}
                  setState={setEmail}
                  placeholder={"example@site.com"}
                />
                 <Input
                  type="password"
                  label={"Password"}
                  state={password}
                  setState={setPassword}
                  placeholder={"example@123"}
                />
                 
                <Button disabled={Loading} text={Loading?"Loading...":"Login Using Email and Password"} onClick={loginUsingEmail}/>
                <p className='p-login'>or</p>
                <Button onClick={googleAuth} text={Loading?"Loading...":"Login Using Google"} blue={true}/>
                <p style={{cursor:"pointer"}} className='p-login' onClick={()=>setLoginForm(!loginForm)}>Don't have an accout ? Click here</p>
            </form>
        </div>:
        <div className='signup-wrapper'>
            <h2 className='title'>
                Sign Up on <span style={{color:"var(--theme)"}}>Financly.</span>
            </h2>
            <form>
                <Input
                  type="text"
                  label={"Full Name"}
                  state={name}
                  setState={setName}
                  placeholder={"ex. John"}
                />
                <Input
                  type="email"
                  label={"Email"}
                  state={email}
                  setState={setEmail}
                  placeholder={"example@site.com"}
                />
                 <Input
                  type="password"
                  label={"Password"}
                  state={password}
                  setState={setPassword}
                  placeholder={"Example@123"}
                />
                 <Input
                  type="password"
                  label={"Confirm Password"}
                  state={confirmPassword}
                  setState={setConfirmPassword}
                  placeholder={"example@123"}
                />
                <Button disabled={Loading} text={Loading?"Loading...":"Signup Using Email and Password"} onClick={signupWithEmail}/>
                <p className='p-login'>or</p>
                <Button onClick={googleAuth} text={Loading?"Loading...":"Signup Using Google"} blue={true}/>
                <p style={{cursor:"pointer"}} className='p-login' onClick={()=>setLoginForm(!loginForm)}>Have an accout Already? Click here</p>
            </form>
        </div>}
        </>
    );
}

export default SignupSigninComponent;
