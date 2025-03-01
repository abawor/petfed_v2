import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { db } from "../firebase/config.js";
import { collection, getDoc, getDocs, addDoc, updateDoc, arrayUnion, deleteDoc, doc } from "firebase/firestore";
import { AppDispatch } from "../redux/store";
import { Pet } from "../../types.ts";

type PetsState = {
    pets: Pet[];
    loading: boolean;
    error: string | null;
};

const initialState: PetsState = {
    pets: [],
    loading: false,
    error: null
};

export const petsSlice = createSlice({
    name: "pets",
    initialState: initialState,
    reducers: {
        setPets: (state, action) => {
            state.pets = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        deletePetLocally: (state, action) => {
            state.pets = state.pets.filter(pet => pet.id !== action.payload)
        },
        toggleLocalNotification: (state, action) => {
            const petId = action.payload[0]
            const scheduleId = action.payload[1]

            return produce(state, draft => {
                const pet = draft.pets.find(pet => pet.id === petId)
                if (!pet) {
                    alert("Error: Pet not found")
                    return
                }

                const schedule = pet.schedules.find(schedule => schedule.id === scheduleId)
                if (!schedule) {
                    alert("Error: Schedule not found")
                    return
                }
                schedule.reminder = !schedule.reminder
            })
        },
        deleteScheduleLocally: (state, action) => {
            const petId = action.payload[0]
            const scheduleId = action.payload[1]

            return produce(state, draft => {
                const pet = draft.pets.find(pet => pet.id === petId)
                if (!pet) {
                    alert("Error: Pet not found")
                    return
                }
                pet.schedules = pet.schedules.filter(schedule => schedule.id != scheduleId)
            })
        }
    }
});

export const { setPets, setLoading, setError, deletePetLocally, toggleLocalNotification, deleteScheduleLocally } = petsSlice.actions

export const fetchPets = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const petsCol = collection(db, "pets")
        const petsSnapshot = await getDocs(petsCol)
        const pets = petsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        dispatch(setPets(pets))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    } finally {
        dispatch(setLoading(false))
    }
}

export const addPet = (pet: Pet) => async (dispatch: AppDispatch) => {
    try {
        const petsCol = collection(db, "pets")
        await addDoc(petsCol, pet)
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export const deletePet = (petId: Pet["id"]) => async (dispatch: AppDispatch) => {
    try {
        const petDoc = doc(db, "pets", petId)
        await deleteDoc(petDoc)
        dispatch(deletePetLocally(petId))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export const addSchedule = (array) => async (dispatch: AppDispatch) => {
    const petId = array[0].value
    const newSchedule = array[1]

    try {
        const petDoc = doc(db, "pets", petId)
        await updateDoc(petDoc, {
            schedules: arrayUnion(newSchedule)
        })
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export const toggleNotification = (array) => async (dispatch: AppDispatch) => {
    const petId = array[0]
    const scheduleId = array[1]

    try {
        const petRef = doc(db, "pets", petId)
        const petDoc = await getDoc(petRef)
        const petData = petDoc.data()
        if (!petData) {
            alert("Error: Pet not found")
            return
        }
        const updatedSchedules = petData.schedules.map(schedule => 
            schedule.id === scheduleId ?
                { ...schedule, reminder: !schedule.reminder }
                : schedule
        )

        await updateDoc(petRef, {
            schedules: updatedSchedules
        })
        
        dispatch(toggleLocalNotification(array))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export const deleteSchedule = (array) => async (dispatch: AppDispatch) => {
    const petId = array[0]
    const scheduleId = array[1]

    try {
        const petRef = doc(db, "pets", petId)
        const petDoc = await getDoc(petRef)
        const petData = petDoc.data()
        const updatedSchedules = petData.schedules.filter(schedule => schedule.id != scheduleId)
        
        await updateDoc(petRef, {
            schedules: updatedSchedules
        })

        dispatch(deleteScheduleLocally(array))
    } catch (error) {
        if (error instanceof Error) {
            dispatch(setError(error.message))
        } else {
            dispatch(setError("An unknown error occurred"))
        }
    }
}

export default petsSlice.reducer;
