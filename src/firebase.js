import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxk7VmbIjA67pDWAZ7kFv1Y6ZGYfBcTiQ",
    authDomain: "downstar-865c4.firebaseapp.com",
    projectId: "downstar-865c4",
    storageBucket: "downstar-865c4.firebasestorage.app",
    messagingSenderId: "795877862249",
    appId: "1:795877862249:web:8ef57cac069624cce82bf8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;