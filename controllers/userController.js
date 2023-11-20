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

const db = getFirestore(firebase);

//Post
const createUser = async (req, res, next) => {
  try {

    await addDoc(collection(db, "users"), req.body);
    success(req, res, "User created successfully", 201);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

//Get
const getUsers = async (req, res, next) => {
  try {
    const user = await getDocs(collection(db, "users"));
    const usersArray = [];

    if (user.empty) {
      error(req, res, "Error inesperado", 400, "User not found")
    } else {
      user.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().name,
          doc.data().lastName,
          doc.data().phone,
          doc.data().email,
          doc.data().dob,
          doc.data().civilState,
          doc.data().profesion,
          doc.data().address,
          doc.data().isBaptized,
        );
        usersArray.push(user);
      });

      success(req, res, usersArray, 200);
    }
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = doc(db, "users", id);
    const user = await getDoc(data);

    const userData = new User(
      user.id,
      user.data().name,
      user.data().lastName,
      user.data().phone,
      user.data().email,
      user.data().dob,
      user.data().civilState,
      user.data().profesion,
      user.data().address,
      user.data().isBaptized,
    );
    if (user.exists()) {
      success(req, res, userData, 200)
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    (req, res, 'Error inesperado', 500, e.message)
  }
};

//Update
const updateUser = async (req, res, next) => {
  try {
    
    const id = req.params.id;

    const data = doc(db, "users", id);
    await updateDoc(data, req.body);
    success(req, res, "User updated successfully", 200);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

//Delete
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "users", id));
    success(req, res, "User deleted successfully", 200);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
