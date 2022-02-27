import React, { useState } from 'react';
import QrScanner from 'qr-scanner';

type CerificateUploadResultProps = {
    data: string
}

function CerificateUploadResult(props: CerificateUploadResultProps) {

    const [decodeSuccess, setDecodeSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState(false);

    return (
        <div className="flex justify-center mt-8">
            <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">EU Digital COVID Certificate Details</label>
                    <div className="flex items-center justify-center w-full text-xs text-black">
                        {
                            props.data
                        }
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Start Voting</button>
                </div>
            </div>
        </div>
    );
}

export default CerificateUploadResult;
