import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import petsReducer from "../redux/Pets";
import PetList from '../components/PetList.tsx';

const store = configureStore({
    reducer: {
        pets: petsReducer,
    }
})

describe("PetList Component", () => {
    it("Renders without crashing", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PetList />
                </MemoryRouter>
            </Provider>
        )
        screen.debug();
        const loadingMsg = screen.getByTestId("petlist-loading");
        expect(loadingMsg).toBeInTheDocument();
        expect(loadingMsg).toHaveTextContent(/Loading pets...$/)
    })
})
