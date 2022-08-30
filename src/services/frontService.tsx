import fs from "fs";

const toBase64 = (file: File) : Promise<string| null | ArrayBuffer> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export async function TranscribeSoundFile(file: File) {
    let response;
    const baseURL = 'http://localhost:3000/api/BackService';

    const encodedString = await toBase64(file);
    if (typeof encodedString === "string") {
        console.log("encodedString", encodedString.length, encodedString.substring(0, 50))
    }
    console.log(typeof encodedString)

    await fetch(baseURL, {
        method: 'POST',
        body: encodedString,

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

const key = 'e3f373f2939b4444814c9e0b5b5cae8f';
const region = 'norwayeast';
const languageOption = 'et-EE';
const baseURL = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const fullUrl = baseURL + '?language=' + languageOption;


interface azureResponse{
    DisplayText: string;
    Duration: number;
    Offset: number;
    RecognitionStatus: string;
}

export async function AzureService(file: File) : Promise<string> {

    let res = "";

    await fetch(fullUrl, {
        method: 'POST',
        body: file,
        headers: {
            'Content-type': 'audio/wav',
            'Ocp-Apim-Subscription-Key': key,
        },
    })
        .then((requestPromise) => {
            if (!requestPromise.ok)
                throw new Error(`HTTP Error: ${requestPromise.status}`);
            return requestPromise.json();
        })
        .then((data : azureResponse) => {
            res = data.DisplayText;
        })
        .catch((error) => {
            throw new Error(`HTTP Error: ${error}`);
        });
    console.log({res})
    return res;
}