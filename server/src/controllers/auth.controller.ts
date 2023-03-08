import to from "await-to-js";
import { Request, Response } from "express";
import User from "../models/user.model";
import { sanitizeHTML } from "../utils/sanitize";
import { schemasObj, ValidTextSchema } from "./auth.utils.controller";

/**
 * Checks if a given username matches the JOI schema and returns a response.
 * @param req
 * @param res
 */
const usernameIsValid = async (req: Request, res: Response<ValidTextSchema>) => {
  const username = sanitizeHTML(req.body.username);

  let [errorTo] = await to(schemasObj["username"].validateAsync({ ["username"]: username }));

  let valid = false;
  let messages: string[] = [];

  if (errorTo) messages = errorTo["details"].map((msg: object) => msg["message"]);
  else valid = true;

  return res.json({ ["valid"]: valid, ["messages"]: messages });
};

/**
 * Checks if a given email matches the JOI schema and returns a response.
 * @param req
 * @param res
 */
const emailIsValid = async (req: Request, res: Response<ValidTextSchema>) => {
  const email = sanitizeHTML(req.body.email);

  let [errorTo] = await to(schemasObj["email"].validateAsync({ ["email"]: email }));

  let valid = false;
  let messages: string[] = [];

  if (errorTo) messages = errorTo["details"].map((msg: object) => msg["message"]);
  else valid = true;

  return res.json({ ["valid"]: valid, ["messages"]: messages });
};

/**
 * Checks if a given password matches the JOI schema and returns a response.
 * @param req
 * @param res
 */
const passIsValid = async (req: Request, res: Response<ValidTextSchema>) => {
  const password = sanitizeHTML(req.body.password);

  let [errorTo] = await to(schemasObj["password"].validateAsync({ ["password"]: password }));

  let valid = false;
  let messages: string[] = [];

  if (errorTo) messages = errorTo["details"].map((msg: object) => msg["message"]);
  else valid = true;

  return res.json({ ["valid"]: valid, ["messages"]: messages });
};

/**
 * Checks if the confirm-password matches the password and returns a response.
 * @param req
 * @param res
 */
const confirmPassIsValid = async (req: Request, res: Response<ValidTextSchema>) => {
  const password = sanitizeHTML(req.body.password);
  const confirmPassword = sanitizeHTML(req.body.confirmPassword);

  let valid = false;
  let messages: string[] = [];

  if (password === confirmPassword) valid = true;
  else messages.push("Must match password");

  return res.json({ ["valid"]: valid, ["messages"]: messages });
};

/**
 * Validates all form inputs then creates a user in the database.
 * @param req
 * @param res
 * @returns
 */
const signup = async (req: Request, res: Response) => {
  let errorTo: any | undefined;
  const username = sanitizeHTML(req.body.username);
  const email = sanitizeHTML(req.body.email);
  const password = sanitizeHTML(req.body.password);
  const confirmPassword = sanitizeHTML(req.body.confirmPassword);

  [errorTo] = await to(
    schemasObj["signup"].validateAsync({ username, email, password, confirmPassword })
  );

  if (errorTo) return res.json({ success: false, message: "Fill in all the fields correctly" });

  const newUser = new User({
    username: username,
    email: email,
    password: password,
  });

  let newUserSaved: any;
  [errorTo, newUserSaved] = await to(newUser.save());

  // code 11000 is the duplicate key error
  if (errorTo) {
    if (errorTo.code === 11000) {
      let duplicateKey = Object.keys(errorTo.keyValue)[0];
      duplicateKey = duplicateKey[0].toUpperCase() + duplicateKey.substr(1);
      return res.json({ success: false, message: `${duplicateKey} is already registered` });
    }
    console.log(errorTo);

    return res.json({ success: false, message: `Something went wrong, try again later` });
  }
  return res.json({ success: true, message: "" });
};

/**
 * Checks if the given credentials are correct
 * @param req
 * @param res
 * @returns
 */
const signin = async (req: Request, res: Response) => {
  let errorTo: any | undefined, username: string | undefined;
  const email = sanitizeHTML(req.body.email);
  const password = sanitizeHTML(req.body.password);

  [errorTo] = await to(schemasObj["signin"].validateAsync({ email, password }));

  console.log(req.session.user, req.session.id);
  if (errorTo) return res.json({ success: false, message: "Incorrect email or password" });

  // search if a user exists
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("signin err", err, "signin err");
      return res.json({ success: false, message: "Something went wrong, try again later" });
    }

    if (!user) {
      console.log("signin !user", err, "signin !user");
      return res.json({ success: false, message: "Something went wrong, try again later" });
    }

    user.comparePassword("password", (errBcrypt: Error | undefined, isMatch?: boolean) => {
      if (errBcrypt) {
        console.log("signin compare err", errBcrypt, "signin compare err");
        return res.json({ success: false, message: "Something went wrong, try again later" });
      }
    });
  });

  req.session.user = {
    id: email,
    isLoggedIn: true,
  };

  return res.json({ success: true, message: "" });
};

export { usernameIsValid, emailIsValid, passIsValid, confirmPassIsValid, signup, signin };
