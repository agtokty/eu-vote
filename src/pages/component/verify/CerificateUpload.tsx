import React, { useState } from 'react';
import QrScanner from 'qr-scanner';

type CerificateUploadProps = {
    onData: (data: any) => void
}

function CerificateUpload(props: CerificateUploadProps) {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [scanSucces, setScanSucces] = useState<boolean>(false);
    const [scanData, setScanData] = useState("");

    const onFileChange = (event: any) => {
        if (event.target.files) {
            let file = event.target.files[0];
            setSelectedFile(file);
            setIsFilePicked(true);

            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => {
                    setScanSucces(true);
                    setScanData(result.data)
                })
                .catch(e => {
                    setScanSucces(false);
                    setErrorMessage(e || "Could not find QR in the image!")
                });
        }
    };


    return (
        <div className="flex justify-center mt-8">
            <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                    <label className="inline-block mb-2 text-gray-500">Upload your EU Digital COVID Certificate</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Select your certificate as image
                                </p>
                            </div>
                            <input type="file" name='certificate' accept="image/*"
                                onChange={onFileChange}
                                className="opacity-0" />
                        </label>
                    </div>
                </div>

                <div className="flex justify-center">
                    {
                        (scanSucces === false && errorMessage) &&
                        <div className="p-2 text-red-500">{errorMessage}</div>
                    }
                </div>
                <div className="flex justify-center p-2">
                    <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                        disabled={!scanSucces}
                        onClick={() => { props.onData(scanData) }}>
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CerificateUpload;
