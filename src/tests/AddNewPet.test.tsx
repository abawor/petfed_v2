import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import userEvent from '@testing-library/user-event'
import AddNewPet from "../pages/AddNewPet.tsx";
import petsReducer from "../redux/Pets.tsx";
import HomeScreen from "../pages/HomeScreen.tsx";

const store = configureStore({
    reducer: {
        pets: petsReducer
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
}

describe("Add New Pet Component", () => {
    it("Displays all fields for adding a new pet", () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-pet"]}>
                    <Routes>
                        <Route path="/add-new-pet" element={<AddNewPet />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const selectPhotoBtn = screen.getByTestId("select-photo-btn");
        expect(selectPhotoBtn).toBeInTheDocument();

        const nameInput = screen.getByTestId("name-input");
        expect(nameInput).toBeInTheDocument();

        const saveBtn = screen.getByTestId("save-btn");
        expect(saveBtn).toBeInTheDocument();
    })

    it("Routes to HomeScreen when save is clicked", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/add-new-pet"]}>
                <Routes>
                        <Route path="/" element={<><HomeScreen /><CurrentRoute /></>} />
                        <Route path="/add-new-pet" element={<><AddNewPet /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const user = userEvent.setup();
        
        const nameInput = screen.getByTestId("name-input");
        await user.type(nameInput, "poppy")

        const saveBtn = screen.getByTestId("save-btn");
        await user.click(saveBtn);
        
        const newRoute = screen.getByTestId("current-route");
        expect(newRoute.textContent).toBe("/")
    })
});
