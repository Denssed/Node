import firebase from "../firebase.js";
import { User } from "../models/userModel.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { success, error } from "../network/response.js";
import bcrypt from "bcrypt";

const db = getFirestore(firebase);

//Post
const createUser = async (req, res, next) => {
  try {
    // const isEmailExist = await User.findOne({ email: req.body.email });
    // if (isEmailExist) {
    //   return error(req, res, "Error inesperado", 400, "Email ya registrado");
    // }

    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(req.body.password, salt);

    const user = {
      email: req.body.email, 
      password: hash, 
      role: req.body.role};

    // const data = req.body;
    await addDoc(collection(db, "users"), user);
    success(req, res, "user created successfully", 201);
    // res.status(200).send("user created successfully");
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};
//Get
const getUsers = async (req, res, next) => {
  try {
    const users = await getDocs(collection(db, "users"));
    const usersArray = [];

    if (users.empty) {
      error(req, res, "Error inesperado", 400, "User not found")
    } else {
      users.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().email,
          doc.data().role
        );
        usersArray.push(user);
      });

      success(req, res, usersArray, 200);
      // res.status(200).send(users);
    }
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = doc(db, "users", id);
    const user = await getDoc(data);

    const userData = new User(
      user.id,
      user.data().email,
      user.data().role
    );
    
    // console.log(user);
    if (user.exists()) {
      success(req, res, userData, 200)
      // res.status(200).send(data.data());
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    (req, res, 'Error inesperado', 500, e.message)
    // res.status(400).send(error.message);
  }
};
//   try {
//     const id = req.params.id;
//     const doc = doc(db, "users", id);
//     const data = await getDoc(doc);
//     // console.log(user);
//     if (data.exists()) {
//       const user = new User(
//         data.id,
//         data.data().email,
//         data.data().password,
//         data.data().role
//       );
//       success(req, res, user, 200);
//       // res.status(200).send(data.data());
//     } else {
//       res.status(404).send("user not found");
//     }
//   } catch (ex) {
//     req, res, "Error inesperado", 500, ex.message;
//     // res.status(400).send(error.message);
//   }
// };

//Update
const updateUser = async (req, res, next) => {
  try {
    
    const id = req.params.id;

    // const hash = ''
    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   hash = await bcrypt.hash(req.body.password, salt);
    // }

    // const user = {
    //   id: req.body.id, 
    //   email: req.body.email, 
    //   role: req.body.role
    // }

    const data = doc(db, "users", id);
    await updateDoc(data, req.body);
    success(req, res, "user updated successfully", 200);
    // res.status(200).send("user updated successfully");
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

//Delete
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "users", id));
    success(req, res, "user deleted successfully", 200);
    // res.status(200).send("user deleted successfully");
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
