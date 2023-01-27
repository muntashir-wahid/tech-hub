import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormControl from "../../components/UI/FormControl/FormControl";
import FormWrapper from "../../components/UI/FormWrapper/FormWrapper";

const Signup = () => {
  // Hook Calls
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Configuration Objects for form controls
  const formControls = [
    {
      id: 1,
      label: "Your Fullname",
      type: "text",
      inputConfig: {
        ...register("fullName", {
          required: "You have to provide your fullname",
        }),
      },
      error: errors?.fullName,
    },
    {
      id: 2,
      label: "Your Email",
      type: "email",
      inputConfig: {
        ...register("email", {
          required: "You have to provide your email",
        }),
      },
      error: errors?.email,
    },
    {
      id: 3,
      label: "Password",
      type: "password",
      inputConfig: {
        ...register("password", {
          required: "You have to provide your password",
          minLength: {
            value: 8,
            message: "Password should be more or equal 8 charecters",
          },
        }),
      },
      error: errors?.password,
    },
    {
      id: 4,
      label: "Confirm Password",
      type: "password",
      inputConfig: {
        ...register("confirmPassword", {
          required: "Please confirm your password",
          minLength: {
            value: 8,
            message: "Password should be more or equal 8 charecters",
          },
        }),
      },
      error: errors?.confirmPassword,
    },
  ];

  // Form submit handler function
  const loginFormSubmitHandler = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="min-h-screen">
      <FormWrapper>
        <form
          className="space-y-3 mb-4"
          onSubmit={handleSubmit(loginFormSubmitHandler)}
        >
          {formControls.map((formControl) => (
            <FormControl
              key={formControl.id}
              label={formControl.label}
              type={formControl.type}
              inputConfig={formControl.inputConfig}
              error={formControl.error}
            />
          ))}

          <input
            type="submit"
            value="Login"
            className="bg-lime-400 px-3 py-2 cursor-pointer"
          />
        </form>
        <p>
          Already have an account?Please
          <Link to="/login" className="p-0 pl-1 text-blue-500">
            Login
          </Link>
        </p>
      </FormWrapper>
    </section>
  );
};

export default Signup;
