import React, { useState } from 'react';
import '../style/Page.css';
import { decode } from '../utils/base45';
import CerificateUpload from './component/verify/CerificateUpload';
import CerificateUploadResult from './component/verify/CerificateUploadResult';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

import { useNavigate } from 'react-router-dom';

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

function VerifyPage() {

    const [data, setData] = useState("");

    let navigate = useNavigate();

    function onData(greenpassBody: any) {
        if (!greenpassBody) {
            console.log("error - empty data!")
        }


        const decodeGreenPassBody = httpsCallable(functions, 'decodeGreenPassBody');

        decodeGreenPassBody({ greenpassBody: greenpassBody })
            .then((result) => {
                console.log(result);
                let userIdentifier = "user_identifier";
                localStorage.setItem("user", userIdentifier);
                navigate("/vote");
            })
            .catch((error) => {
                const code = error.code;
                const message = error.message;
                const details = error.details;
                console.log(error);
            });
    }

    return (
        <div className="Page">
            <div className="Page-content">
                <div className="m-20 py-20 bg-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center p-3">
                        <div className='text-center text-black text-xl'>
                            We need your vaccination certificate to verify your identity before voting
                        </div>
                        {
                            data === "" ?
                                <CerificateUpload onData={onData} />
                                :
                                <CerificateUploadResult data={data} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyPage;
