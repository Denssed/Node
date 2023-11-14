import firebase from "../firebase.js";
import { Staff } from "../models/staffModel.js";
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
const createStaff = async (req, res, next) => {
  try {
    // const isEmailExist = await Staff.findOne({ email: req.body.email });
    // if (isEmailExist) {
    //   return error(req, res, "Error inesperado", 400, "Email ya registrado");
    // }

    const salt = await bcrypt.genSalt(10);
    const hash  = await bcrypt.hash(req.body.password, salt);

    const staff = {
      email: req.body.email, 
      password: hash, 
      role: req.body.role};

    // const data = req.body;
    await addDoc(collection(db, "staff"), staff);
    success(req, res, "Staff created successfully", 201);
    // res.status(200).send("Staff created successfully");
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};
//Get
const getStaff = async (req, res, next) => {
  try {
    const staff = await getDocs(collection(db, "staff"));
    const usersArray = [];

    if (staff.empty) {
      error(req, res, "Error inesperado", 400, "Staff not found")
    } else {
      staff.forEach((doc) => {
        const staff = new Staff(
          doc.id,
          doc.data().email,
          doc.data().role
        );
        usersArray.push(staff);
      });

      success(req, res, usersArray, 200);
      // res.status(200).send(staff);
    }
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};

const getPersonal = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = doc(db, "staff", id);
    const staff = await getDoc(data);

    const staffData = new Staff(
      staff.id,
      staff.data().email,
      staff.data().role
    );
    
    // console.log(Staff);
    if (staff.exists()) {
      success(req, res, staffData, 200)
      // res.status(200).send(data.data());
    } else {
      res.status(404).send("Staff not found");
    }
  } catch (e) {
    (req, res, 'Error inesperado', 500, e.message)
    // res.status(400).send(error.message);
  }
};
//   try {
//     const id = req.params.id;
//     const doc = doc(db, "staff", id);
//     const data = await getDoc(doc);
//     // console.log(Staff);
//     if (data.exists()) {
//       const Staff = new Staff(
//         data.id,
//         data.data().email,
//         data.data().password,
//         data.data().role
//       );
//       success(req, res, Staff, 200);
//       // res.status(200).send(data.data());
//     } else {
//       res.status(404).send("Staff not found");
//     }
//   } catch (ex) {
//     req, res, "Error inesperado", 500, ex.message;
//     // res.status(400).send(error.message);
//   }
// };

//Update
const updateStaff = async (req, res, next) => {
  try {
    
    const id = req.params.id;

    // const hash = ''
    // if (req.body.password) {
    //   const salt = await bcrypt.genSalt(10);
    //   hash = await bcrypt.hash(req.body.password, salt);
    // }

    // const Staff = {
    //   id: req.body.id, 
    //   email: req.body.email, 
    //   role: req.body.role
    // }

    const data = doc(db, "staff", id);
    await updateDoc(data, req.body);
    success(req, res, "Staff updated successfully", 200);
    // res.status(200).send("Staff updated successfully");
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

//Delete
const deleteStaff = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "staff", id));
    success(req, res, "Staff deleted successfully", 200);
    // res.status(200).send("Staff deleted successfully");
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
    // res.status(400).send(error.message);
  }
};

export { createStaff, getStaff, getPersonal, updateStaff, deleteStaff };
