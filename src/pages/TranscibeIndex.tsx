import React, { useState } from 'react';
import { TranscribeSoundFile } from '../services/frontService';
const TranscibeIndex = () => {
    const [selectedFile, setSelectedFile] = useState<File>();

    function fileUploadHandler(e: any) {
        console.log('hanlding', e);
        setSelectedFile(e.target.files[0]);
    }

    function Transcribe() {
        if (!selectedFile) {
            alert('Please upload a sound file');
            return;
        }
        TranscribeSoundFile(selectedFile);
    }

    return (
        <section>
            <h3 className="border-solid border-2 border-indigo-600 w-20">
                {' '}
                STT
            </h3>
            <input
                onChange={fileUploadHandler}
                type="file"
                name="soundFile"
                id="file-selector"
                accept=".wav"
            />

            <button onClick={() => Transcribe()}>Transcribe</button>
        </section>
    );
};

export default TranscibeIndex;
