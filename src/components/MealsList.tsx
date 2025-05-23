import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals, deleteMeal } from "../redux/Meals.tsx";
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdOutlineDeleteForever } from "react-icons/md";
import { AppDispatch, RootState } from "../redux/store";
import { Meal } from "../../types.ts";


export default function MealsList() {
    const { meals, loading, error } = useSelector((state: RootState) => state.meals)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMeals())
    }, [dispatch])

    const handleDelete = (mealId: Meal["id"]) => {
        if(!confirm("Are you sure?\nYou will not be able to undo this action")) {
            return
        }
        
        dispatch(deleteMeal(mealId))
   }

   if (loading) return <p data-testid="meal-list-loading">Loading meals...</p>
   if (error) return <p>Error: {error}...</p>

    return (
        <ul className="grid grid-cols-3 gap-4">
            <Link
                to="/add-new-meal"
                className="aspect-square flex justify-center items-center text-teal-500 bg-teal-100 text-slate-500 rounded-lg border-solid border-4 border-teal-500"
                data-testid="add-new-meal-btn"
            >
                <FaPlus size={75}/>
            </Link>
            {meals !== undefined ? 
            meals.map((meal) => {
                return (
                    <li
                        key={ meal.id }
                        className="pl-1 text-start aspect-square rounded-lg border-solid border-4 border-slate-500"
                        data-testid="meal-item"
                    >
                        <div className="flex items-top justify-between">
                            <p className="font-bold text-2xl">{meal.name}</p>
                            <div>
                            <MdOutlineDeleteForever
                                size={50}
                                onClick={() => handleDelete(meal.id)}
                                />
                            </div>
                        </div>
                        <p className="font-semibold">{meal.type}</p>
                        <p className="">{meal.quantity} {meal.unit}</p>
                    </li>
                )
            })
            : "" }
        </ul>
    )
}
