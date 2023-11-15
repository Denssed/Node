import firebase from "../firebase.js";
import { Presentation } from "../models/presentationModel.js";
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
const createPresentation = async (req, res, next) => {
  try {

    await addDoc(collection(db, "presentations"), req.body);
    success(req, res, "Presentation created successfully", 201);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

//Get
const getPresentations = async (req, res, next) => {
  try {
    const presentation = await getDocs(collection(db, "presentations"));
    const presentationsArray = [];

    if (presentation.empty) {
      error(req, res, "Error inesperado", 400, "Presentation not found")
    } else {
      presentation.forEach((doc) => {
        const presentation = new Presentation(
          doc.id,
          doc.data().nameFather,
          doc.data().phoneFather,
          doc.data().nameMother,
          doc.data().phoneMother,
          doc.data().nameChild,
          doc.data().childPhoto,
          doc.data().godParent,
          doc.data().minister,
          doc.data().date,
        );
        presentationsArray.push(presentation);
      });

      success(req, res, presentationsArray, 200);
    }
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

const getPresentation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = doc(db, "presentations", id);
    const presentation = await getDoc(data);

    const presentationData = new Presentation(
      presentation.id,
      presentation.data().nameFather,
      presentation.data().phoneFather,
      presentation.data().nameMother,
      presentation.data().phoneMother,
      presentation.data().nameChild,
      presentation.data().childPhoto,
      presentation.data().godParent,
      presentation.data().minister,
      presentation.data().date,
    );
    if (presentation.exists()) {
      success(req, res, presentationData, 200)
    } else {
      res.status(404).send("Presentation not found");
    }
  } catch (e) {
    (req, res, 'Error inesperado', 500, e.message)
  }
};

//Update
const updatePresentation = async (req, res, next) => {
  try {
    
    const id = req.params.id;

    const data = doc(db, "presentations", id);
    await updateDoc(data, req.body);
    success(req, res, "Presentation updated successfully", 200);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
};

//Delete
const deletePresentation = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, "presentations", id));
    success(req, res, "Presentation deleted successfully", 200);
  } catch (ex) {
    error(req, res, "Error inesperado", 500, ex.message);
  }
};

export { createPresentation, getPresentations, getPresentation, updatePresentation, deletePresentation };
