import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Cta } from "@/app/ui/cta/cta";

describe("Cta test", () => {
  it('Render Cta"', () => {
    const Component = <Cta as={"button"}>Hello World!</Cta>    
    const { getByText } = render(Component);

    expect(getByText("Hello World!")).not.toBeNull();
  });
});
