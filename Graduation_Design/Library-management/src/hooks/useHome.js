import { useEffect, useState, useMemo } from "react"
import { weather, exitSession } from '../API/AxiosURL';
import { getSession, Re } from '../API/session';
import { useNavigate } from 'react-router-dom';




export default function useHome() {
    
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [weat,setWeat] = useState({});

    let loginName = useMemo(()=>getSession("key").roleAccount,[])

    // 请求天气与地址
    useEffect(()=>{
        weather().then((data)=>{
            setWeat(data)
        })
    },[])

    // 确定退出
    const confirm = () => {
        navigate("/")
        Re("key")
        exitSession()
    }


    

    return [weat,loginName,confirm,isModalOpen,setIsModalOpen]
}