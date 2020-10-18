var admin = require("firebase-admin")

//Estas variables de admin se movieron a .env.local que es privado y no se comparte dentro del codigo en el cliente
//inclusive el gitignore lo incluye
//var serviceAccount = require("./firebase-keys.json")
//JSON.parse(process.env.FIREBASE_CONFIG)
try {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
    //viene del archivo de configuracion de variables de entorno .env
    databaseURL: process.env.FIREBASE_DATABES_URL
  })
} catch (error) {
  
}

export const firestore = admin.firestore()