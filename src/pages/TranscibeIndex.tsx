import React, { useState } from 'react';
import { TranscribeSoundFile, AzureService } from '../services/frontService';
const TranscibeIndex = () => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const [transcribeResult,setTranscribeResult ] = useState<string>("adasdasdasad")
    const [isLoading, setIsLoading] = useState<boolean>(false)


    function fileUploadHandler(e: any) {
        console.log('hanlding', e);
        setSelectedFile(e.target.files[0]);
    }

    function Transcribe() {
        if (!selectedFile) {
            alert('Please upload a sound file');
            return;
        }
        setIsLoading(true)

        AzureService(selectedFile).then((resultString) => {
            setTranscribeResult(resultString);
            setIsLoading(false)
        });
    }

    return (
        <section className={"flex flex-col gap-5 items-center justify-center "}>
            <h3 className="p-10">
                STT
            </h3>



            <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-5 items-center justify-center">
                <input
                    onChange={fileUploadHandler}
                    type="file"
                    name="soundFile"
                    id="file-selector"
                    accept=".wav"
                />
                <div>
                    <h3>Results!</h3>
                    {transcribeResult &&
                    <div className="border-solid border-2 border-indigo w-80">{transcribeResult}</div>}
                </div>

            </div>

            <div className="flex flex-col gap-5 items-center">
                <button className="h-10 w-40 border-solid border-2 border-indigo rounded-lg text-white bg-sky-500 hover:bg-sky-700" onClick={() => Transcribe()}>Transcribe</button>
                </div>

            </div>
            {isLoading &&  <div className="loader" />}

        </section>
    );
};

export default TranscibeIndex;
