import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const registerRoute = async (req, res, next) => {
  const admins = ["admin@123.com"];
  const saltRounds = 10;
  const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    const checkUserAvail = await User.findOne({ email: req.body.email });
    if (checkUserAvail) {
      return next({
        status: 401,
        message: "User Already found!",
      });
    } else {
      const newUser = new User({
        ...req.body,
        password: hashedPass,
        isAdmin: admins.includes(req.body.email) ? true : false,
        membership: false,
      });

      const saveUser = await newUser.save();
      res.status(200).json({
        id: saveUser?._id,
        username: saveUser?.username,
        email: saveUser?.email,
        isAdmin: saveUser?.isAdmin,
        membership: saveUser?.membership,
        bookInHand: saveUser?.bookInHand,
        rentedHistory: saveUser?.rentedHistory,
        requestedBooks: saveUser?.requestedBooks,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const loginRoute = async (req, res, next) => {
  try {
    const checkUserAvail = await User.findOne({ email: req.body.email });
    if (checkUserAvail) {
      const checkPass = await bcrypt.compare(
        req.body.password,
        checkUserAvail.password
      );
      if (!checkPass) {
        return next({
          status: 404,
          message: "Incorrect username and password!",
        });
      } else {
        res.status(200).json({
          id: checkUserAvail?._id,
          username: checkUserAvail?.username,
          email: checkUserAvail?.email,
          isAdmin: checkUserAvail?.isAdmin,
          membership: checkUserAvail?.membership,
          rentedHistory: checkUserAvail?.rentedHistory,
          bookInHand: checkUserAvail?.bookInHand,
          requestedBooks: checkUserAvail?.requestedBooks,
        });
      }
    } else {
      return next({
        status: 401,
        message: "User not found!",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json({
      membership: user?.membership,
      rentedHistory: user?.rentedHistory,
      bookInHand: user?.bookInHand,
      requestedBooks: user?.requestedBooks,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      { isAdmin: false },
      {
        password: 0,
      }
    );
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const delUser = await User.findById({ _id: req.params.id });

    if (delUser) {
      console.log(delUser);
      await User.findByIdAndDelete({ _id: delUser._id });
      res.status(200).json({
        message: "User deleted successfully!",
      });
    } else {
      res.status(401).json({
        message: "User not found!",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getBookInHand = async (req, res, next) => {
  try {
    const extraInfo = await User.findById(
      { _id: req.params.id },
      { bookInHand: 1, requestedBooks: 1, rentedHistory: 1 }
    );
    res.status(200).json({
      bookInHand: extraInfo?.bookInHand,
      rentedHistory: extraInfo?.rentedHistory,
      requestedBooks: extraInfo?.requestedBooks,
    });
  } catch (err) {
    next(err);
  }
};
