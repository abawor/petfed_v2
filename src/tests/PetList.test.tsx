import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import petsReducer from "../redux/Pets.tsx";
import PetList from '../components/PetList.tsx';
import AddNewPet from "../pages/AddNewPet.tsx";

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
    }
});

const emptyStore = configureStore({
    reducer: {
        pets: () => ({
            pets: [],
            loading: false,
            error: null
        })
    }
});

const store = configureStore({
    reducer: {
        pets: () => ({
            pets: [{
                id: '1',
                name: 'poppy',
                photo: 'poppy.jpg',
            }],
            loading: false,
            error: null
        })
    }
});

function CurrentRoute() {
    const location = useLocation();
    return <span data-testid="current-route">{location.pathname}</span>;
}

describe("PetList Component", () => {
    it("Renders without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <PetList />
                </MemoryRouter>
             </Provider>
        );
        const loadingMsg = screen.getByTestId("petlist-loading");
        expect(loadingMsg).toBeInTheDocument();
        expect(loadingMsg).toHaveTextContent(/Loading pets...$/);
    });

    it("Renders add new pet button and when clicked routes to /add-new-pet", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route path="/" element={<><PetList /><CurrentRoute /></>} />
                        <Route path="/add-new-pet" element={<><AddNewPet /><CurrentRoute /></>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        const user = userEvent.setup();
        const addNewPetBtn = screen.getByTestId("add-new-pet-btn");
        expect(addNewPetBtn).toBeInTheDocument();
        
        await user.click(addNewPetBtn);
        
        const newRoute = screen.getByTestId("current-route");
        expect(newRoute).toHaveTextContent("/add-new-pet")
    })

    it("Renders a pet from store", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PetList />
                </MemoryRouter>
             </Provider>
        );
        const petItem = screen.getByTestId("pet-item");
        expect(petItem).toBeInTheDocument();
    });
});
