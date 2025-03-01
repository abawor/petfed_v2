import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPets, toggleNotification, deleteSchedule } from '../redux/Pets.tsx';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdOutlineDeleteForever } from 'react-icons/md';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { AppDispatch } from "../redux/store";


export default function ScheduleList() {
    const { pets } = useSelector(state => state.pets)
    const dispatch: AppDispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchPets())
    }, [dispatch])

    const handleDelete = (petId, scheduleId) => {
      if(!confirm("Are you sure?\nYou will not be able to undo this action")) {
        return
      }
      
      dispatch(deleteSchedule([petId, scheduleId]))
    };
    
    return (
        <ul className="grid grid-cols-3 gap-4">
            <Link
                to="/add-new-schedule"
                className="aspect-square flex justify-center items-center text-teal-500 bg-teal-100 text-slate-500 rounded-lg border-solid border-4 border-teal-500"
            >
                <FaPlus size={75}/>
            </Link>

            {pets.map((pet) => {
                return (
                    pet.schedules.map((schedule) => {
                        return (
                            <li
                                key={ schedule.id }
                                className="pl-1 text-start aspect-square rounded-lg border-solid border-4 border-slate-500"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-xl truncate">{pet.name}</p>
                                    <MdOutlineDeleteForever
                                        size={50}
                                        onClick={() => handleDelete(pet.id, schedule.id)}
                                    />
                                </div>
                                <p className="font-bold text-lg truncate">{schedule.name}</p>
                                <p className="font-semibold truncate">{schedule.days.join(', ')}</p>
                                <p>{schedule.time}</p>
                                <div className="flex items-center justify-end">
                                    <p className="text-xs mr-1">Reminder</p>
                                    <Toggle
                                        className="float-right mr-1"
                                        checked={schedule.reminder}
                                        onChange={() => dispatch(toggleNotification([pet.id, schedule.id]))}
                                    />
                                </div>
                            </li>
                        )
                    })
                )
            })}

        </ul>
    )
}
