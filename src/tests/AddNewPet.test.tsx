import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AddNewPet from "../pages/AddNewPet.tsx";
import petsReducer from "../redux/Pets.tsx";

const store = configureStore({
    reducer: {
        pets: petsReducer
    }
});

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
});
