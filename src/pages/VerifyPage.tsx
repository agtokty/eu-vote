import React, { useState } from 'react';

import CerificateUpload from './component/verify/CerificateUpload';
import CerificateUploadResult from './component/verify/CerificateUploadResult';

import { useNavigate } from 'react-router-dom';
import { DCCData } from '../service/models';

import '../style/Page.css';

function VerifyPage() {

    const [data, setData] = useState("");

    let navigate = useNavigate();

    function onUserVerified(qrData: DCCData) {
        console.log(qrData);
        let userIdentifier = qrData?.nam?.fn;
        localStorage.setItem("user", userIdentifier);
        alert("Certofocate owner: " + qrData.nam.fn)
        // navigate("/vote");
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
                                <CerificateUpload onUserVerified={onUserVerified} />
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
