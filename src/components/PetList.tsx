import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchPets, deletePet } from "../redux/Pets.tsx"
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useLongPress } from 'use-long-press';
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/store";
import { Pet } from "../../types.ts";

export default function PetList() {
    const { pets, loading, error } = useSelector((state: RootState) => state.pets)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPets())
    }, [dispatch])

    const handleDelete = ((petId: Pet["id"]) => {
        if(!confirm("Are you sure you want to delete this pet?\nYou will not be able to undo this action")) {
            return
        }
        
        dispatch(deletePet(petId))
    })

    const bind = useLongPress((callback, petId) => 
        handleDelete(String(petId.context)),
        {threshold: 1000,}
    )

    if (loading) return <p data-testid="petlist-loading">Loading pets...</p>
    if (error) return <p>Error: {error}...</p>

    return (
        <ul className={pets.length === 0 ? "flex" : "grid grid-cols-3 gap-4"}>
            <div key={ 1 }>
                <li>
                    <Link
                        to="/add-new-pet"
                        className="flex justify-center items-center h-32 w-32 py-3 bg-teal-100 text-teal-500 rounded-full border-solid border-4 border-teal-500"
                    >
                        <FaPlus size={75}/>
                    </Link>
                </li>
            </div>
            {pets.map((pet) => {
                return (
                    <div
                        key={ pet.id }
                        {...bind(pet.id)}
                    >
                        <li className="flex w-32 h-32 overflow-hidden rounded-full">
                            <img src={ pet.photo } className="object-cover h-full w-full"/>
                        </li>
                        <p>{pet.name}</p>
                    </div>
                )
            })}
        </ul>
    )
}
