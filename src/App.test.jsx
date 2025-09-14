import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

describe("App", () => {
  it("should fetch and display todo notes", async () => {
    const mockTodosResponse = {
      todos: [
        { id: 1, todo: "Test Todo 1", completed: false, userId: 1 },
        { id: 2, todo: "Test Todo 2", completed: true, userId: 2 },
      ],
    };

    const mockUser1Response = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
    };

    const mockUser2Response = {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
    };

    vi.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.includes("todos")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTodosResponse),
        });
      }
      if (url.includes("users/1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser1Response),
        });
      }
      if (url.includes("users/2")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser2Response),
        });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("should add a note and display it", () => {
    render(<App />);

    const userName = screen.getByLabelText("User Name");
    const todoText = screen.getByLabelText("Todo Text");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.change(userName, { target: { value: "John Doe" } });
    fireEvent.change(todoText, { target: { value: "Test Todo" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });
});
