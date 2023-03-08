import mongoose from "mongoose";
import { validationSchemas, validTextSchema } from "../controllers/auth.utils.controller";
import Joi, { object } from "joi";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 12;

const UserSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Changes the plaintext password into a hash + salt
 * Taken from https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
 */
// arrow function omits 'this' keyword or something, raising an error
UserSchema.pre("save", function (next) {
  let user: any = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

/**
 * Compare if the hash of the given password is the same as the one in the db
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function (
  candidatePassword,
  cb: (err: Error | undefined, isMatch?: boolean) => void
) {
  let user: any = this;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(undefined, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
