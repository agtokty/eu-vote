import React, { useState } from 'react';
import QrScanner from 'qr-scanner';
import { decodeGreenPassBody } from '../../../service/api';
import { DCCData } from '../../../service/models';

type CerificateUploadProps = {
    onUserVerified: (data: DCCData) => void
}

function CerificateUpload(props: CerificateUploadProps) {

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [scanSucces, setScanSucces] = useState<boolean>(false);
    const [imageData, setImageData] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const [QRData, setQRData] = useState<any>();

    const onFileChange = (event: any) => {
        if (event.target.files) {
            let file = event.target.files[0];

            setPreviewImage(URL.createObjectURL(event.target.files[0]))

            setSelectedFile(file);
            setIsFilePicked(true);

            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => {
                    setScanSucces(true);
                    setImageData(result.data)
                })
                .catch(e => {
                    setScanSucces(false);
                    setErrorMessage(e || "Could not find QR in the image!")
                });
        } else {
            setIsFilePicked(false);
        }
    };


    const onUploadClick = () => {
        console.log("onUploadClick");

        if (!imageData) {
            setErrorMessage("Error - empty data!")
        }

        decodeGreenPassBody(imageData)
            .then((result: any) => {
                setQRData(result.data);
                props.onUserVerified(result.data as DCCData)
            })
            .catch((error) => {
                setErrorMessage("Couldn't read your data")
            });
    }


    const removeFile = () => {
        setIsFilePicked(false);
        setScanSucces(false);
    }

    return (
        <div className="p-4 mt-8 w-full">
            <div className="max-w-2xl rounded-lg p-2 shadow-xl bg-gray-50">
                <div className="m-4">
                    {isFilePicked ?
                        (
                            <>
                                <button className="px-4 mt-5 mb-5 text-white text-sm bg-red-500 rounded shadow-xl"
                                    onClick={removeFile}>
                                    Remove this certificate
                                </button>
                                <div className="flex items-center justify-center w-full">
                                    <div className='flex flex-col w-full border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300'>
                                        <img className='object-contain max-h-40'
                                            alt="certificate preview"
                                            src={previewImage} />
                                    </div>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <label className="inline-block mb-2 text-gray-500">Upload your EU Digital COVID Certificate</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
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
                            </>
                        )
                    }
                </div>
                {
                    (scanSucces === false && errorMessage) &&
                    <div className="flex justify-center">
                        <div className="p-2 text-red-500">{errorMessage}</div>
                    </div>
                }
                {
                    isFilePicked &&
                    <div className="flex justify-center p-2">
                        {
                            scanSucces === true &&
                            <button className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                                disabled={!scanSucces}
                                onClick={onUploadClick}>
                                Check Cerificate
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default CerificateUpload;
