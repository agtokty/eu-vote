import { connectFunctionsEmulator, getFunctions, httpsCallable, HttpsCallableResult } from "@firebase/functions";
import { initializeApp } from "firebase/app";
import { type } from "os";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "eu-vote.firebaseapp.com",
    projectId: "eu-vote",
    storageBucket: "eu-vote.appspot.com",
    messagingSenderId: "197197846473",
    appId: "1:197197846473:web:c6801e6634388a5c24ba18",
    measurementId: "G-532L0JGTX4"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development") {
    connectFunctionsEmulator(functions, "localhost", 5001);
}


export function decodeGreenPassBody(qrData: string): Promise<HttpsCallableResult<unknown>> {
    console.log(qrData)
    if (!qrData) {
        console.log("error - empty data!")
    }

    const decodeGreenPassBodyFunction = httpsCallable(functions, 'decodeGreenPassBody');

    return decodeGreenPassBodyFunction({ greenPassBody: qrData });
}