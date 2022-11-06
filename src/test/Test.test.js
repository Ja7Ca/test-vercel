import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../page/Login"
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

test('render input username login', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const emailInput = screen.getByPlaceholderText(/Masukkan Username/i);
    expect(emailInput).toBeInTheDocument();
})

test('render input password login', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const passInput = screen.getByPlaceholderText(/Masukkan Password/i);
    expect(passInput).toBeInTheDocument();
})

test('input username empty value', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const emailInput = screen.getByPlaceholderText(/Masukkan Username/i);
    expect(emailInput.value).toBe("");
})

test('input password empty value', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const passInput = screen.getByPlaceholderText(/Masukkan Password/i);
    expect(passInput.value).toBe("");
})

test('change value input username', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const emailInput = screen.getByPlaceholderText(/Masukkan Username/i);
    const testValue = "test";
  
    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
})

test('change value input password', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Login/>
            </BrowserRouter>
        </Provider>
    )
    const passInput = screen.getByPlaceholderText(/Masukkan Password/i);
    const testValue = "test";
  
    fireEvent.change(passInput, { target: { value: testValue } });
    expect(passInput.value).toBe(testValue);
})