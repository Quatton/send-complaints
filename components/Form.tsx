import { FormEvent } from "react";
import FormButton from "./FormButton";
import FormDropdown from "./FormDropdown";
import FormTextField from "./FormTextField";
import FormTitle from "./FormTitle";

const submitComplain = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function Form() {
  const type_options = ["Complain", "Suggest"];
  const about_options = ["Features", "Bugs", "Graphics", "Performance"];
  return (
    <form onSubmit={submitComplain}>
      <div className="grid gap-2">
        <FormTitle />
        <div className="flex justify-between">
          <FormDropdown side="" name="complain-type" options={type_options} />
          <span
            className="
              text-gray-500
              sm:text-sm inline-flex px-2
              items-center justify-center
              "
          >
            About
          </span>
          <FormDropdown side="" name="complain-about" options={about_options} />
        </div>
        <FormTextField />
        <div className="text-center">
          <FormButton text="Submit" />
        </div>
      </div>
    </form>
  );
}
