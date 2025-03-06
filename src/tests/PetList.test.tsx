import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import petsReducer from "../redux/Pets";
import PetList from '../components/PetList.tsx';
import AddNewPet from "../pages/AddNewPet.tsx";

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
    }
})

const emptyStore = configureStore({
    reducer: {
        pets: () => ({
            pets: [],
            loading: false,
            error: null
        })
    }
    
})

describe("PetList Component", () => {
    it("Renders without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <PetList />
                </MemoryRouter>
             </Provider>
        )
        const loadingMsg = screen.getByTestId("petlist-loading");
        expect(loadingMsg).toBeInTheDocument();
        expect(loadingMsg).toHaveTextContent(/Loading pets...$/)
    })

    it("Renders add new pet button and when clicked routes to /add-new-pet", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<PetList />} />
                        <Route path="/add-new-pet" element={<AddNewPet />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
            
        )
        const user = userEvent.setup()
        const addNewPetBtn = screen.getByTestId("add-new-pet-btn");
        expect(addNewPetBtn).toBeInTheDocument()
        
        await user.click(addNewPetBtn)
        const selectPhotoBtn = screen.getByTestId("select-photo-btn");
        expect(selectPhotoBtn).toBeInTheDocument()
    })
})
