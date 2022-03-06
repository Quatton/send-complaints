import FormButton from "./FormButton";
import FormDropdown from "./FormDropdown";
import FormTextField from "./FormTextField";
import FormTitle from "./FormTitle";

export default function Form({ data }) {
  const submitComplain = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/complaints", {
      body: JSON.stringify({
        title: event.target.title.value,
        type: event.target.type.value,
        about: event.target.about.value,
        desc: event.target.desc.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    event.target.reset();
  };

  const type_options = data.type_options;
  const about_options = data.about_options;
  return (
    <form onSubmit={submitComplain}>
      <div className="grid gap-2 landscape:grid-cols-2">
        <FormTitle />
        <div className="flex justify-between">
          <FormDropdown side="" name="type" options={type_options} />
          <span
            className="
              text-gray-500
              sm:text-sm inline-flex px-2
              items-center justify-center
              "
          >
            About
          </span>

          <FormDropdown side="" name="about" options={about_options} />
        </div>
        <div className="landscape:col-span-2">
          <FormTextField />
        </div>
        <div className="text-center landscape:col-span-2">
          <FormButton text="Submit" />
        </div>
      </div>
    </form>
  );
}
