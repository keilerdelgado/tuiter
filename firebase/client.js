import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBXROvRalkzimkGqC4wJYf8grdlPCAxtPw",
  authDomain: "keiter.firebaseapp.com",
  databaseURL: "https://keiter.firebaseio.com",
  projectId: "keiter",
  storageBucket: "keiter.appspot.com",
  messagingSenderId: "353259860979",
  appId: "1:353259860979:web:5b9d591905a2ef37ecd886"
}
/* const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
console.log(firebaseConfig) */
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuth = (user) => {
  const { email, photoURL, displayName, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

export const addTuit = ({ avatar, content, userId, username,img }) => {
  return db.collection('tuits').add({
    avatar,
    content,
    userId,
    img,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

const mapTuitFromFirebaseToTuitObject = doc => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

//esta funcion tiene como objetivo escuchar el backend para que cuando este le avise sobre cambios en la bd nos envie los datos nuevamente actualizados, de esa forma cuando alguien haga un tuit automaticamente se actualizara el feed incluyendo este nuevo tuit
export const listenLatestTuits = (callback) => {
  return db
    .collection('tuits')
    .orderBy('createdAt','desc')
    .limit(20)
    .onSnapshot(snapshot => {
      const newTuits = snapshot.docs.map(mapTuitFromFirebaseToTuitObject)
      callback(newTuits)
    })
}

//esta funcion es mas estatica hace un solo fetch a la bd por ello la sustituimos por la de arriba que sigue escuchando
/* export const fetchLatestTuits = () => {
  return db.collection('tuits')
    .orderBy('createdAt','desc')
    .limit(20)
    .get()
    .then(({ docs }) => {
      return docs.map(mapTuitFromFirebaseToTuitObject)
    })
} */

export const uploadImage = file => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}