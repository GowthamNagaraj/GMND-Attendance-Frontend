"use client"

import Image from "next/image"
import { useState } from "react"
import Progress from "@/ComponentsProgress"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { EyeClosed,Eye } from "lucide-react"
import {string} from 'yup'

const userImg = "/images/user.png" 

// let userSchema = {
//     username: string().required("Enter your name").min(3).max(20),
//     email: string().email().matches().required(),
//     password: string().required().min(8).max(20),
// }
const UserForm = () => {

    const router = useRouter()
    const API = process.env.NEXT_PUBLIC_API_BASE_URL
    const [isLoading, setIsLoading] = useState(true)
    const [validateColor, setValidateColor] = useState({
        usernameValidator: "bg-slate-100",
        emailValidator: "bg-slate-100",
        passwordValidator: "bg-slate-100"
    })

    const [state, setState] = useState({
        headerName:"LOGIN",
        isVisible:true,
        linkName:"REGISTER",
    })

    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    })

    const [showPassword, setShowPassword] = useState(true)
    function handleChange(name){
        
        if(name === "REGISTER"){
            setState({
                headerName: "REGISTER",
                isVisible: false,
                linkName: "LOGIN"
            })
        }else{
            setState({
                headerName: "LOGIN",
                isVisible: true,
                linkName: "REGISTER"
            })
        }

        setFormData({
            userName: "",
            email: "",
            password: ""
        })
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData);

        const { username, email, password} = formData;

        if (state.headerName === "LOGIN") {
            if (formData.email !== "" && formData.password !== "") {
                setValidateColor((prevState)=>({
                    ...prevState,
                    emailValidator:"bg-lime-100",
                    passwordValidator:"bg-lime-100"
                }))
                setIsLoading(false);
                axios.post(`${API}/users/login`, formData)
                    .then((response) => {
                        console.log(response);
                        alert(response.data.message)
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("user",response.data.data.username)
                        const userid = response.data.data._id
                        localStorage.setItem("userid",userid)
                        setIsLoading(true);
                        if (response.status === 200) {
                            router.push(`/records/${userid}`);
                        }
                    })
                    .catch((error) => {
                        alert(error.message+": Check your internet connection?");
                        setIsLoading(true);
                        console.log("error:",error.message);
                    });
            } else {
                alert("Please fill all the fields");
                setValidateColor((prevState)=>({
                    ...prevState,
                    emailValidator: email === "" ? "bg-red-100" : "bg-lime-100",
                    passwordValidator: password === "" ? "bg-red-100" : "bg-lime-100"
                }))
                return 
            }
        } else if (username !=="" || email !== "" || password !== "") {
            setIsLoading(false);
            // http://localhost:1998/GMND/api/users/
            axios.post(`${API}/users/`, formData)
                .then((response) => {
                    console.log(response);
                    alert(response.data.message)
                    setIsLoading(true);
                    if (response.data.status === 201) {
                        setState({
                            headerName: "LOGIN",
                            isVisible: true,
                            linkName: "REGISTER"
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
            
            
        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }
    return (
        <div className="w-80 p-6 bg-sky-100 rounded-lg">
            <section className="flex flex-col items-center gap-y-6">
                    <h3 className="text-3xl font-bold text-sky-800">{state.headerName}</h3>
                
                    <Image src={userImg} alt="user" width={100} height={100 } className="rounded-full bg-slate-50" hidden={state.isVisible}/>

                    <div className="flex flex-col items-center justify-center gap-y-5">
                        <form className="flex flex-col items-center gap-y-2">
                            <input type="text" className={`${validateColor.usernameValidator} min-w-64 h-8 rounded-xs pl-3 text-sm`} placeholder="USERNAME" onChange={(e)=>setFormData((prevState)=>({...prevState,username:e.target.value}))} value={formData.username} hidden={state.isVisible}/>
                            
                            <input type="text" className={`${validateColor.emailValidator} min-w-64 h-8 rounded-xs pl-3 text-sm`} placeholder="EMAIL" onChange={(e)=>setFormData((prevState)=>({...prevState,email:e.target.value}))} value={formData.email}/>
                            
                            <div className="w-full flex justify-end"><span className="text-xs cursor-pointer text-sky-600 font-bold" hidden={!state.isVisible}>Forget password ?</span></div>
                            
                            <div className="relative"><input type={showPassword ? "password" : "text"} className={`${validateColor.passwordValidator} min-w-64 h-8 rounded-xs pl-3 text-sm`} placeholder="PASSWORD" onChange={(e)=>setFormData((prevState)=>({...prevState,password:e.target.value}))} value={formData.password}/>
                                <Eye className="absolute top-1.5 right-1 cursor-pointer" size={20} color="#005f6b" strokeWidth={1.75} hidden={showPassword} onClick={()=>setShowPassword(true)}/>
                                <EyeClosed className="absolute top-1.5 right-1 cursor-pointer" size={20} color="#005f6b" strokeWidth={1.75} hidden={!showPassword} onClick={()=>setShowPassword(false)}/>    
                            </div>
                        </form>

                        <button className="bg-lime-300 px-6 py-1 cursor-pointer hover:bg-sky-500 hover:text-slate-50 rounded-xs" onClick={(e)=>handleSubmit(e)}>
                            {state.headerName}
                        </button>
                    </div>
                
                    <span className="text-xs">Already i have an account ? <span className="font-bold hover:text-sky-500 cursor-pointer" onClick={()=>handleChange(state.linkName)}>{state.linkName}</span></span>
            </section>
            <Progress progressHidden={isLoading} />
        </div>
    )
}

export default UserForm
