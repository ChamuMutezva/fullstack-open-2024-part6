import Cafe from "./cafe";
import { screen, render } from "@testing-library/react";

test("test cafe app", () => {
    render(<Cafe />);
    screen.debug();
    const div = screen.getByText("cafe");
    expect(div).toBeDefined();
});
