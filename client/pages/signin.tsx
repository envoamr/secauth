import FormHeader from "../components/Form/FormHeader";
import InputText from "../components/Form/InputText";
import FormFootnote from "../components/Form/FormFootnote";
import { FaRegEnvelope } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import BtnSubmit from "../components/Form/BtnSubmit";
import axios from "../composables/axiosConfig";
import { useState, useEffect } from "react";
import to from "await-to-js";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLogIn } from "../store/auth";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");

  const [signinError, setSigninError] = useState(false);
  const [signinErrorMsg, setSigninErrorMsg] = useState("");

  const submitSignin = async (): Promise<void> => {
    if (emailVal !== "" && passVal !== "") {
      let [err, results] = await to<{ data: { success: boolean; message: string } }>(
        axios.post("/auth/signin", {
          email: emailVal,
          password: passVal,
        })
      );

      // axios error
      if (err) {
        setSigninError(true);
        setSigninErrorMsg("Something went wrong, try again later");
      }
      // server validation failed or username/email already registered
      else if (results && results.data.message) {
        setSigninError(true);
        setSigninErrorMsg(results.data.message);
      }
      // user successfully saved to db
      else if (results && results.data.success) {
        setSigninError(false);
        setSigninErrorMsg("");

        console.log("no");
        router.push("/dashboard");
        dispatch(setLogIn());
        console.log("yes");
      }
      // server sent a response but didn't include data, that should never happen (mitm?)...
      else {
        setSigninError(true);
        setSigninErrorMsg("Something went wrong, try again later");
      }
    }
    // at least one field is empty
    else {
      setSigninError(true);
      setSigninErrorMsg("Fill in all the fields correctly");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 space-y-10 md:space-y-12 dark:bg-black dark:text-white">
      {/* Form header */}
      <FormHeader text="Sign In" />

      {/* Email, password, and submit button */}
      <div className="flex flex-col space-y-8">
        <div>
          <InputText
            type="email"
            label="Email"
            placeholder="oamr@secauth.io"
            Icon={FaRegEnvelope}
            setValue={setEmailVal}
          />
        </div>
        <div>
          <InputText
            type="password"
            label="Password"
            placeholder="********"
            Icon={BiLockAlt}
            iconSize="text-3xl"
            setValue={setPassVal}
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <BtnSubmit text="Sign in" clicked={submitSignin} />
          {signinError && (
            <p className="px-3 py-2 text-red-600 border border-red-600">{signinErrorMsg}</p>
          )}
        </div>
      </div>

      {/* 'Create account' and 'reset password' links */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <FormFootnote
          textBefore="No account yet?"
          link={{ text: "Create an account", href: "/register" }}
        />
        <FormFootnote
          textBefore="Forgot password?"
          link={{ text: "Reset password", href: "/reset-password" }}
        />
      </div>
    </div>
  );
};

export default Home;
