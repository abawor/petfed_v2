import { useEffect, useState } from 'react';
import Toggle from 'react-toggle'
import 'react-toggle/style.css';


export default function SettingsScreen() {
    const localNotifications = localStorage.getItem("globalNotifications")
    const globalNotifications = localNotifications ? localNotifications === "true" : true
    const [notifications, setNotifications] = useState(globalNotifications)

    useEffect(() => {
        localStorage.setItem("globalNotifications", String(notifications))
    }, [notifications])    

    return (
        <div className='text-2xl flex items-center m-10'>
            <p className='mr-2'>Global notifications</p>
            <Toggle
                className=""
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                data-testid="global-notifications-toggle"
            />
        </div>
    )
}
