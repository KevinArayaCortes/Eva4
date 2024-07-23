import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { Usuario } from '@/Interfaces/IUsuario'
import { Juego } from '@/Interfaces/IJuego'

export const registrarUsuario = async(usuario:Usuario)=>{
    const docRef = await addDoc(collection(db, "usuarios"), usuario);
};

export const obtenerUsuarios = async()=>{
    let usuarios:Usuario[] = []
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    querySnapshot.forEach((doc) => {
        let usuario:Usuario = {
            nUsuario:doc.data().nUsuario,
            contraseña:doc.data().contraseña,
            key:doc.id
        }
        usuarios.push(usuario)
    });
    return usuarios
};

export const obtenerUsuario = async(key:string)=>{
    const docRef = doc(db, "usuarios", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let usuario:Usuario = {
            nUsuario:docSnap.data().nUsuario,
            contraseña:docSnap.data().contraseña,
            key:docSnap.id
        }
        return usuario
    } else {
        return undefined
    }
};

export const actualizarUsuario = async(u:Usuario)=>{
    const ref = doc(db, "usuarios",u.key!)
    await updateDoc(ref,{...u})
};

export const borrarUsuario = async (u:Usuario) => {
    const docRef = doc(db, "usuarios", u.key!);
    await deleteDoc(docRef);
};


export const registrarJuego = async(juego:Juego)=>{
    const docRef = await addDoc(collection(db, "juegos"), juego);
};

export const obtenerJuegos = async()=>{
    let juegos:Juego[] = []
    const querySnapshot = await getDocs(collection(db, "juegos"));
    querySnapshot.forEach((doc) => {
        let juego:Juego = {
            nombre:doc.data().nombre,
            genero:doc.data().genero,
            plataforma:doc.data().plataforma,
            jugadores:doc.data().jugadores,
            conexion:doc.data().conexion,
            key:doc.id
        }
        juegos.push(juego)
    });
    return juegos
};

export const obtenerJuego = async(key:string)=>{
    const docRef = doc(db, "juegos", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let juego:Juego = {
            nombre:docSnap.data().nombre,
            genero:docSnap.data().genero,
            plataforma:docSnap.data().plataforma,
            jugadores:docSnap.data().jugadores,
            conexion:docSnap.data().conexion,
            key:docSnap.id
        }
        return juego
    } else {
        return undefined
    }
};

export const actualizarJuego = async(j:Juego)=>{
    const ref = doc(db, "juegos",j.key!)
    await updateDoc(ref,{...j})
};

export const borrarJuego = async (j:Juego) => {
    const docRef = doc(db, "juegos", j.key!);
    await deleteDoc(docRef);
};