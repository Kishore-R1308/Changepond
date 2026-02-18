import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormValComp from "./FormValComp"

test("show typed name", ()=>{
    render(<FormValComp />);
    const finput = screen.getByPlaceholderText("enter first name");
    userEvent.type(finput,"kishore");
});