import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import SettingsScreen from "../pages/SettingsScreen.tsx";
import petsReducer from "../redux/Pets.tsx";

const emptyStore = configureStore({
    reducer: {
        pets: petsReducer
    }
});

describe("Settings Screen Component", () => {
    it("Renders global notification toggle", async () => {
        render(
            <Provider store={emptyStore}>
                <MemoryRouter>
                    <SettingsScreen />
                </MemoryRouter>
            </Provider>
        );
        
        const globalNotificationsToggle = screen.getByTestId("global-notifications-toggle");
        expect(globalNotificationsToggle).toBeInTheDocument()
    })

});