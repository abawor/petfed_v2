import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMeal } from '../redux/Meals.tsx'
import { AppDispatch } from "../redux/store";
import Select from "react-select";

export default function AddNewMeal() {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const foodTypes = [
        {value: 'Wet', label: 'Wet'},
        {value: 'Dry', label: 'Dry'},
        {value: 'Snack', label: 'Snack'},
        {value: 'Other', label: 'Other'}
    ];
    const unitTypes = [
        {value: 'grams', label: 'grams'},
        {value: 'ounces', label: 'ounces'},
        {value: 'count', label: 'count'},
        {value: 'other', label: 'other'}
    ];

    const handleSave = () => {
        if (!name || !type || !quantity || !unit) {
            alert('All fields are required!');
            return;
        }

        const newMeal = {
            name: name,
            type: type,
            quantity: quantity,
            unit: unit,
        };

        dispatch(addMeal(newMeal))

        navigate('/meals');
    };

    return (
        <div className="flex flex-col p-8 items-center">

            <h1 className="text-3xl font-bold mb-6">Add new meal</h1>

            <div className="w-3/5">

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 p-2 w-full border border-slate-500 rounded-md"
                    data-testid="meal-name-input"
                />
                <Select
                    options={foodTypes}
                    isMulti={false}
                    onChange={(e) => {
                        if (e) {
                            setType(e.value)}}
                        }
                    placeholder="Type"
                    className="mb-4 w-full border border-slate-500 rounded-md"
                />
                <Select
                    options={unitTypes}
                    isMulti={false}
                    onChange={(e) => {
                        if (e) {
                            setUnit(e.value)}}
                        }
                    placeholder="Unit"
                    className="mb-4 w-full border border-slate-500 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mb-4 p-2 w-full border border-slate-500 rounded-md"
                    data-testid="meal-quantity-input"
                />
                <button
                    type="button"
                    onClick={handleSave}
                    className="py-2 font-bold w-full bg-teal-400 text-white rounded-lg"
                    data-testid="meal-save-btn"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
