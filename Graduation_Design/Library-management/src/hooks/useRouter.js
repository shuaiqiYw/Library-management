import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 重定向
export default function Redirect({to}) {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate(to)
        // eslint-disable-next-line
    },[])
}