import firebase from "../firebase.js";
import { Login } from "../models/loginModel.js";
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
import jwt from "jsonwebtoken";

const db = getFirestore(firebase);

//Post
const loginUser = async (req, res, next) => {
  try {
    const docs = await getDocs(collection(db, "staff"));
    let user;
    docs.forEach((doc) => {
      if (doc.data().email === req.body.email) user = doc;
    });
    if (!user)
      return error(req, res, "Error inesperado", 400, "Usuario no encontrado");
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.data().password
    );
    if (!isPasswordCorrect)
      return error(req, res, "Error inesperado", 400, "Contraseña incorrecta");

    const token = jwt.sign(
      {
        id: user.id,
        email: user.data().email,
        role: user.data().role,
      },
      process.env.TOKEN_SECRET,
      {expiresIn: '1h'}
    );


    return success(req, res, {token: token, role: user.data().role}, 200 );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { loginUser };
