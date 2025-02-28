import { useEffect, useState } from 'react';
import Toggle from 'react-toggle'
import 'react-toggle/style.css';


export default function SettingsScreen() {
    const savedNotifications = localStorage.getItem("globalNotifications")
    const [notifications, setNotificiations] = useState(savedNotifications ? savedNotifications === "true" : true)

    useEffect(() => {
        localStorage.setItem("globalNotifications", notifications)
    }, [notifications])    

    return (
        <div className='text-2xl flex items-center m-10'>
            <p className='mr-2'>Global notifications</p>
            <Toggle
                className=""
                checked={notifications}
                onChange={() => setNotificiations(!notifications)}
            />
        </div>
    )
}
