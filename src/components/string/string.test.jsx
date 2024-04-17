import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { StringComponent } from "./string";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

describe("StringComponent", () => {
  it("string revers correctly with even number of letters", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    userEvent.type(input, "1234");
    const button = screen.getByRole("button", { name: "Развернуть" });
    userEvent.click(button);
    await waitFor(
      () => {
        const container = screen.getByTestId("chars");
        expect(container.textContent).toBe("4321");
      },
      { timeout: 4000 }
    );
  });

  it("string revers with odd number of letters", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    userEvent.type(input, "12345");
    const button = screen.getByRole("button", { name: "Развернуть" });
    userEvent.click(button);
    await waitFor(
      () => {
        const container = screen.getByTestId("chars");
        expect(container.textContent).toBe("54321");
      },
      { timeout: 5000 }
    );
  });

  it("string revers with only one letter", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    userEvent.type(input, "1");
    const button = screen.getByRole("button", { name: "Развернуть" });
    userEvent.click(button);
    await waitFor(
      () => {
        const container = screen.getByTestId("chars");
        expect(container.textContent).toBe("1");
      },
      { timeout: 1000 }
    );
  });

  it("revers empty string", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    );
    const input = screen.getByTestId("string-input");
    userEvent.type(input, " ");
    const button = screen.getByRole("button", { name: "Развернуть" });
    userEvent.click(button);
    await waitFor(
      () => {
        const container = screen.getByTestId("chars");
        expect(container.textContent).toBe(" ");
      },
      { timeout: 1000 }
    );
  });
});
