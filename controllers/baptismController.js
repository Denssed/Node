import firebase from "../firebase.js";
import { Baptism } from "../models/baptismModel.js";
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
const createBaptism = async (req, res, next) => {
  try {

    await addDoc(collection(db, "baptisms"), req.body);
    success(req, res, "Baptism created successfully", 201);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

//Get
const getBaptisms = async (req, res, next) => {
  try {
    const baptism = await getDocs(collection(db, "baptisms"));
    const baptismsArray = [];

    if (baptism.empty) {
      error(req, res, "Error inesperado", 400, "Baptism not found")
    } else {
      baptism.forEach((doc) => {
        const baptism = new Baptism(
          doc.id,
          doc.data().name,
          doc.data().surName,
          doc.data().pof,
          doc.data().age
        );
        baptismsArray.push(baptism);
      });

      success(req, res, baptismsArray, 200);
    }
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

const getBaptism = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = doc(db, "baptisms", id);
    const baptism = await getDoc(data);

    const baptismData = new Baptism(
      baptism.id,
      baptism.data().name,
      baptism.data().surName,
      baptism.data().pof,
      baptism.data().age
    );
    if (baptism.exists()) {
      success(req, res, baptismData, 200)
    } else {
      res.status(404).send("Baptism not found");
    }
  } catch (e) {
    (req, res, 'Error inesperado', 500, e.message)
  }
};

//Update
const updateBaptism = async (req, res, next) => {
  try {
    
    const id = req.params.id;

    const data = doc(db, "baptisms", id);
    await updateDoc(data, req.body);
    success(req, res, "Baptism updated successfully", 200);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

//Delete
const deleteBaptism = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "baptisms", id));
    success(req, res, "Baptism deleted successfully", 200);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

export { createBaptism, getBaptisms, getBaptism, updateBaptism, deleteBaptism };
