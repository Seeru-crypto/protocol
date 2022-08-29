import { encode as base64_encode } from 'base-64';

export async function TranscribeSoundFile(file: File) {
    let response;
    const baseURL = 'http://localhost:3000/api/BackService';
    const formData = new FormData();
    formData.append('soundfile', file); // a .wav sound file
    formData.append('title', 'sound file title');
    //const encodedString = Buffer.from(file.toString()).toString('base64');
    const fileText = await file.text();
    const encoded = base64_encode(fileText);

    const jsonData = { title: 'A file title', soundFile: encoded };

    await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(jsonData),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then((requestPromise) => {
            if (!requestPromise.ok)
                throw new Error(`HTTP Error: ${requestPromise.status}`);
            return requestPromise.json();
        })
        .then((data) => {
            response = data;
        })
        .catch((error) => {
            throw new Error(`HTTP Error: ${error}`);
        });
    console.log(response);

    return response;
}
