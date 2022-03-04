import { FormEvent } from "react";
import FormButton from "./FormButton";
import FormDropdown from "./FormDropdown";
import FormTextField from "./FormTextField";

type FormProps = {
  options: Array<string>;
  width: Number;
  height: Number;
};
const submitComplain = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function Form({ options, width, height }: FormProps) {
  return (
    <form onSubmit={submitComplain}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <FormDropdown options={options} />
          <FormTextField width={width} height={height} />
        </div>
        <div className="text-center">
          <FormButton text="Submit" />
        </div>
      </div>
    </form>
  );
}
