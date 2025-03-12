import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "../redux/Pets.tsx";
import App from '../App.tsx';

const loadingStore = configureStore({
    reducer: {
        pets: petsReducer,
    }
});

describe("PetList Component", () => {
    it("Renders App without crashing", () => {
        render(
            <Provider store={loadingStore}>
                <App />
             </Provider>
        );
    });

    it("Renders Route links", () => {
        render(
            <Provider store={loadingStore}>
                <App />
             </Provider>
        );

        const petsLink = screen.getByText("Pets");
        const mealsLink = screen.getByText("Meals");
        const scheduleLink = screen.getByText("Schedule");
        const settingsLink = screen.getByText("Settings");
        expect(petsLink).toBeInTheDocument();
        expect(mealsLink).toBeInTheDocument();
        expect(scheduleLink).toBeInTheDocument();
        expect(settingsLink).toBeInTheDocument();
    });
});
