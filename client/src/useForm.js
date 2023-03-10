import { useState } from "react";


export const useForm=(callback,initialState={})=>{
    const [values,setValues]=useState(initialState);

    const onChange=(e)=>{
        console.log("values :"+e.target.value);
        // setValues({...values,[e.target.name]:e.target.value})
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit=(e)=>{
        console.log(values)
        e.preventDefault();
        callback();
    }
    return{
        onChange,
        onSubmit,
        values
    }
}