import { FormEvent } from "react";
import FormButton from "./FormButton";

const submitComplain = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

export default function Form() {
  return (
    <form onSubmit={submitComplain}>
      <div className="flex flex-col gap-2">
        <select
          name="complain-type"
          id="complain-type"
          className="
              py-2
              focus:ring-indigo-500 
              focus:border-indigo-500 
              flex-1 block 
              rounded-none 
              rounded-r-md 
              sm:text-sm 
              border-gray-300
            "
          required
        >
          <option value="complain">Complain</option>
          <option value="suggestion">Suggestion</option>
        </select>
        <textarea
          id="complain"
          placeholder="..."
          className="
                resize-none w-[45ch] py-2
                focus:ring-indigo-500 
                focus:border-indigo-500 
                flex-1 block 
                rounded-none 
                rounded-r-md 
                sm:text-sm 
                border-gray-300

                placeholder:italic placeholder:text-slate-400
              "
          required
        />
        <div className="text-center">
          <FormButton text="Submit"></FormButton>
        </div>
      </div>
    </form>
  );
}
