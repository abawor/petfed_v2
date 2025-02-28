import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
import { db } from "../firebase/config";
import { collection, getDoc, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, doc } from "firebase/firestore";

export const petsSlice = createSlice({
    name: "pets",
    initialState: {
        pets: [],
        loading: false,
        error: null
    },
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
                const schedule = pet.schedules.find(schedule => schedule.id === scheduleId)

                schedule.reminder = !schedule.reminder
            })
        },
        deleteScheduleLocally: (state, action) => {
            const petId = action.payload[0]
            const scheduleId = action.payload[1]

            return produce(state, draft => {
                const pet = draft.pets.find(pet => pet.id === petId)
                pet.schedules = pet.schedules.filter(schedule => schedule.id != scheduleId)
            })
        }
    }
});

export const { setPets, setLoading, setError, deletePetLocally, toggleLocalNotification, deleteScheduleLocally } = petsSlice.actions

export const fetchPets = () => async (dispatch) => {
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
        dispatch(setError(error.message))
    } finally {
        dispatch(setLoading(false))
    }
}

export const addPet = (pet) => async (dispatch) => {
    try {
        const petsCol = collection(db, "pets")
        const docRef = await addDoc(petsCol, pet)
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const deletePet = (petId) => async (dispatch) => {
    try {
        const petDoc = doc(db, "pets", petId)
        await deleteDoc(petDoc)
        dispatch(deletePetLocally(petId))
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const addSchedule = (array) => async (dispatch) => {
    const petId = array[0].value
    const newSchedule = array[1]

    try {
        const petDoc = doc(db, "pets", petId)
        await updateDoc(petDoc, {
            schedules: arrayUnion(newSchedule)
        })
    } catch (error) {
        dispatch(setError(error.message))
    }
}

export const toggleNotification = (array) => async (dispatch) => {
    const petId = array[0]
    const scheduleId = array[1]

    try {
        const petRef = doc(db, "pets", petId)
        const petDoc = await getDoc(petRef)
        const petData = petDoc.data()

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
        dispatch(setError(error.message))
    }
}

export const deleteSchedule = (array) => async (dispatch) => {
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
        dispatch(setError(error.message))
    }
}

export default petsSlice.reducer;
