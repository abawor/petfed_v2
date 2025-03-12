import { describe, it } from "vitest";
import { render } from "@testing-library/react";
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
});
