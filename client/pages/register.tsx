import to from "await-to-js";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { FaRegEnvelope } from "react-icons/fa";
import BtnSubmit from "../components/Form/BtnSubmit";
import FormFootnote from "../components/Form/FormFootnote";
import FormHeader from "../components/Form/FormHeader";
import InputText from "../components/Form/InputText";
import InputTextErrList from "../components/Form/InputTextErrList";
import axios from "../composables/axiosConfig";
import router, { useRouter } from "next/router";

const Home = () => {
  const [usernameVal, setUsernameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [confirmPassVal, setConfirmPassVal] = useState("");

  const [usernameErrs, setUsernameErrs] = useState<string[]>([]);
  const [emailErrs, setEmailErrs] = useState<string[]>([]);
  const [passErrs, setPassErrs] = useState<string[]>([]);
  const [confirmPassErrs, setConfirmPassErrs] = useState<string[]>([]);

  const [signupError, setSignupError] = useState(false);
  const [signupErrorMsg, setSignupErrorMsg] = useState("");

  interface ResponseInterface {
    data: {
      valid: boolean;
      messages: string[];
    };
  }

  const usernameUnfocus = async () => {
    if (usernameVal !== "") {
      let [err, results] = await to<ResponseInterface>(
        axios.post("/auth/username/valid", {
          username: usernameVal,
        })
      );

      if (results && results.data.valid) {
        setUsernameErrs([]);
      } else if (results && !results.data.valid) {
        setUsernameErrs(results.data.messages);
      }
    } else {
      setUsernameErrs([]);
    }
  };

  const emailUnfocus = async () => {
    if (emailVal !== "") {
      let [err, results] = await to(
        axios.post("/auth/email/valid", {
          email: emailVal,
        })
      );

      if (results && results.data.valid) {
        setEmailErrs([]);
      } else if (results && !results.data.valid) {
        setEmailErrs(results.data.messages);
      }
    } else {
      setEmailErrs([]);
    }
  };

  const passUnfocus = async () => {
    if (passVal !== "") {
      let [err, results] = await to(
        axios.post("/auth/password/valid", {
          password: passVal,
        })
      );

      if (results && results.data.valid) {
        setPassErrs([]);
      } else if (results && !results.data.valid) {
        setPassErrs(results.data.messages);
      }

      confirmPassUnfocus();
    } else {
      setPassErrs([]);
    }
  };

  const confirmPassUnfocus = async () => {
    if (confirmPassVal !== "") {
      if (passVal !== "") {
        let [err, results] = await to(
          axios.post("/auth/confirmpassword/valid", {
            password: passVal,
            confirmPassword: confirmPassVal,
          })
        );

        if (results && results.data.valid) {
          setConfirmPassErrs([]);
        } else if (results && !results.data.valid) {
          setConfirmPassErrs(results.data.messages);
        }
      } else {
        setConfirmPassErrs([]);
      }
    }
  };

  const submitSignup = async (): Promise<void> => {
    if (
      usernameErrs.length === 0 &&
      emailErrs.length === 0 &&
      passErrs.length === 0 &&
      confirmPassErrs.length === 0
    ) {
      if (usernameVal !== "" && emailVal !== "" && passVal !== "" && confirmPassVal !== "") {
        let [err, results] = await to<{ data: { success: boolean; message: string } }>(
          axios.post("/auth/signup", {
            username: usernameVal,
            email: emailVal,
            password: passVal,
            confirmPassword: confirmPassVal,
          })
        );
        // axios error
        if (err) {
          setSignupError(true);
          setSignupErrorMsg("Something went wrong, try again later");
        }
        // server validation failed or username/email already registered
        else if (results && results.data.message) {
          setSignupError(true);
          setSignupErrorMsg(results.data.message);
        }
        // user successfully saved to db
        else if (results && results.data.success) {
          setSignupError(false);
          setSignupErrorMsg("");
          router.push("/signin");
        }
        // server sent a response but didn't include data
        else {
          setSignupError(true);
          setSignupErrorMsg("Something went wrong, try again later");
        }
      }
      // at least one field is empty
      else {
        setSignupError(true);
        setSignupErrorMsg("Fill in all the fields correctly");
      }
    }
    // error in one of the field
    else {
      setSignupError(true);
      setSignupErrorMsg("Fill in all the fields correctly");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 space-y-10 md:space-y-12 dark:bg-black dark:text-white">
      {/* Form header */}
      <FormHeader text="Create your account" />

      {/* Username, email, password, confirm password, and submit button */}
      <div className="flex flex-col space-y-8">
        <div>
          <InputText
            type="text"
            label="Username"
            placeholder="oamr"
            Icon={AiOutlineUser}
            setValue={setUsernameVal}
            unFocus={usernameUnfocus}
          />
          {usernameErrs.length !== 0 && <InputTextErrList errors={usernameErrs} />}
        </div>
        <div>
          <InputText
            type="email"
            label="Email"
            placeholder="oamr@secauth.io"
            Icon={FaRegEnvelope}
            setValue={setEmailVal}
            unFocus={emailUnfocus}
          />
          {emailErrs.length !== 0 && <InputTextErrList errors={emailErrs} />}
        </div>
        <div>
          <InputText
            type="password"
            label="Password"
            placeholder="**********"
            Icon={BiLockAlt}
            iconSize="text-3xl"
            setValue={setPassVal}
            unFocus={passUnfocus}
          />
          {passErrs.length !== 0 && <InputTextErrList errors={passErrs} />}
        </div>
        <div>
          <InputText
            type="password"
            label="Confirm Password"
            placeholder="**********"
            Icon={BiLockAlt}
            iconSize="text-3xl"
            setValue={setConfirmPassVal}
            unFocus={confirmPassUnfocus}
          />
          {confirmPassErrs.length !== 0 && <InputTextErrList errors={confirmPassErrs} />}
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <BtnSubmit text="Sign up" clicked={submitSignup} />
          {signupError && (
            <p className="px-3 py-2 text-red-600 bg-red-200 border border-red-600">
              {signupErrorMsg}
            </p>
          )}
        </div>
      </div>

      {/* 'Sign in' link */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <FormFootnote textBefore="Have an account?" link={{ text: "Sign in", href: "/signin" }} />
      </div>
    </div>
  );
};

export default Home;
