import Joi from "joi";
import User from "../models/user.model";

const validationSchemas = {
  username: Joi.string().min(4).max(30).alphanum().messages({
    "string.empty": "Can not be empty",
    "string.min": "Must be at least 4 characters long",
    "string.max": "Must be 30 chracters or less",
    "string.alphanum": "Can only contain letters and numbers",
  }),
  email: Joi.string().email().messages({
    "string.empty": "Can not be empty",
    "string.email": "Must be a valid email",
  }),
  password: Joi.string()
    .min(8)
    .message("Must be at least 8 characters long")
    .regex(/[a-z]+/)
    .message("Must have at least one lowercase character")
    .regex(/[A-Z]+/)
    .message("Must have at least one uppercase character")
    .regex(/[0-9]+/)
    .message("Must have at least one digit")
    .regex(/[^a-zA-Z0-9]+/)
    .message("Must have at least one special character")
    .messages({
      "string.empty": "Can not be empty",
    }),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "Must match password" }),
};

// the signup and signin are created here because i'm not sure if it takes
// extra resources to create it every time in auth.controller.signup()
const schemasObj = {
  username: Joi.object({ ["username"]: validationSchemas["username"] }),
  email: Joi.object({ ["email"]: validationSchemas["email"] }),
  password: Joi.object({ ["password"]: validationSchemas["password"] }),
  confirmpass: Joi.object({ ["confirmPassword"]: validationSchemas["confirmPassword"] }),
  signup: Joi.object({
    ["username"]: validationSchemas["username"],
    ["email"]: validationSchemas["email"],
    ["password"]: validationSchemas["password"],
    ["confirmPassword"]: validationSchemas["confirmPassword"],
  }),
  signin: Joi.object({
    ["email"]: validationSchemas["email"],
    ["password"]: validationSchemas["password"],
  }),
};

interface ValidTextSchema {
  valid?: boolean;
  messages?: string[];
}

// validates if a string matches the given schema pattern
const validTextSchema = async (text: string, schema: string): Promise<ValidTextSchema> => {
  try {
    // if no error occurred, the text followed the correct schema
    const textScheme = Joi.object({ [schema]: validationSchemas[schema] });
    const k = await textScheme.validateAsync({ [schema]: text }, { abortEarly: false });
    // console.log(k);

    return { valid: true };
  } catch (error: any) {
    // joi's error format is <"Username" is not valid>, remove quotes
    // TODO: what if error is thrown for other reasons, not cause it doesnt match scheme?
    // console.log(error);
    const messageList: string[] = error.details.map((err: object): string => err["message"]);
    return { valid: false, messages: messageList };
  }
};

const uniqueEntry = async (entry: string, value: string): Promise<boolean> => {
  const result = await User.findOne({ [entry]: value }).exec();
  return result;
};

export { validationSchemas, schemasObj, validTextSchema, uniqueEntry, ValidTextSchema };
