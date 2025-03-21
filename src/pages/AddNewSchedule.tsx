import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addSchedule } from '../redux/Pets.tsx'
import { useNavigate } from 'react-router-dom';
import Select, { MultiValue } from "react-select";
import { AppDispatch, RootState } from "../redux/store";

export default function AddNewMeal() {
    const { pets } = useSelector((state: RootState) => state.pets)
    const dispatch: AppDispatch = useDispatch()
    const [scheduledPet, setScheduledPet] = useState('');
    const [name, setName] = useState('');
    const [days, setDays] = useState<MultiValue<{value: string, label: string}>>([]);
    const [time, setTime] = useState('');
    const navigate = useNavigate();

    const petList = 
        pets.map((pet) => {
            return (
                { value: pet.id, label: pet.name }
            )
        })
    
    const weekdays = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' },
    ]

    const handleSave = () => {
        if (!scheduledPet || !name || !days || !time ) {
            alert('All fields are required!');
            return;
        }

        const selectedDays = []
        for (let i = 0; i < days.length; i++) {
            selectedDays.push(days[i].value)
        }

        const newSchedule = {
            id: Date.now().toString(),
            name: name,
            days: selectedDays,
            time: time,
            reminder: true
        };

        dispatch(addSchedule([scheduledPet, newSchedule]));
        
        navigate('/schedule');
    };

    return (
        <div className="flex flex-col p-8 items-center">

            <h1 className="text-3xl font-bold mb-6">Add new schedule</h1>

            <div className="w-3/5">

                <div className="mb-4 leading-8 text-left w-full border border-slate-500 rounded-md">
                    <Select
                        options={petList}
                        isMulti={false}
                        onChange={(e) => {
                            if (e) {
                                setScheduledPet(e.value)}}
                            }
                        placeholder="Pet"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 w-full border border-slate-500 rounded-md"
                />

                <div className="mb-4 leading-8 text-left w-full border border-slate-500 rounded-md">
                    <Select
                        options={weekdays}
                        isMulti={true}
                        onChange={(e) => {setDays(e)}}
                        placeholder="Days"
                    />
                </div>

                <div className="mb-4 leading-8 pl-1 text-left border border-slate-500 rounded-md">
                    <input
                        aria-label="Time"
                        type="time"
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <button
                type="button"
                onClick={handleSave}
                className="py-2 font-bold w-full bg-teal-400 text-white rounded-lg"
                >
                Save
                </button>
            </div>
        </div>
    );
}
