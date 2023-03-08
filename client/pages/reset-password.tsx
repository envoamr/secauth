import FormHeader from "../components/Form/FormHeader";
import InputText from "../components/Form/InputText";
import FormFootnote from "../components/Form/FormFootnote";
import { FaRegEnvelope } from "react-icons/fa";
import { BiLockAlt } from "react-icons/bi";
import BtnSubmit from "../components/Form/BtnSubmit";
import { useState } from "react";
import axios from "../composables/axiosConfig";
import InputTextErrList from "../components/Form/InputTextErrList";

const Home = () => {
  const [emailVal, setEmailVal] = useState("");
  const [emailErrs, setEmailErrs] = useState([]);

  const emailUnfocus = async () => {
    if (emailVal !== "") {
      try {
        const results = await axios.post("/auth/email/valid", {
          email: emailVal,
        });

        if (results.data.valid) {
          setEmailErrs([]);
        } else if (!results.data.valid) {
          setEmailErrs(results.data.messages);
        }
      } catch (error) {}
    } else {
      setEmailErrs([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-16 space-y-10 md:space-y-12 dark:bg-black dark:text-white">
      {/* Form header */}
      <FormHeader text="Reset Password" />

      {/* Email and submit button */}
      <div className="flex flex-col space-y-8">
        <div>
          <InputText
            type="email"
            label="Email"
            placeholder=""
            Icon={FaRegEnvelope}
            setValue={setEmailVal}
            unFocus={emailUnfocus}
          />
          {emailErrs.length !== 0 && <InputTextErrList errors={emailErrs} />}
        </div>
        <BtnSubmit text="Send reset email" />
      </div>

      {/* Create account and reset password links */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <FormFootnote
          textBefore="No account yet?"
          link={{ text: "Create an account", href: "/register" }}
        />
      </div>
    </div>
  );
};

export default Home;
