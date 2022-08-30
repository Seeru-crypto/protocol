import type { NextApiRequest, NextApiResponse } from 'next';
import {arrayBuffer} from "stream/consumers";

const region = 'norwayeast';
const baseURL = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const languageOption = 'et-EE';
const fullUrl = baseURL + '?language=' + languageOption;
const key = 'e3f373f2939b4444814c9e0b5b5cae8f';

function base64ToArrayBuffer(base64String : string) : ArrayBuffer {
    const buffer : Buffer = Buffer.from(base64String, "base64")
    return buffer.subarray().buffer;
}

async function fromStream(encodedString: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sdk = require("microsoft-cognitiveservices-speech-sdk");
    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = languageOption;
    const pushStream = sdk.AudioInputStream.createPushStream();

    const arrBfr: ArrayBuffer = base64ToArrayBuffer(encodedString);

    await pushStream.write(arrBfr);
    pushStream.close();

    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync((result: any) => {
        console.log("RECOGNIZED: ", result)
        recognizer.close();
    });
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = req.body;
    console.log("body: ", body.length, body.substring(0, 50))

    if (body) {
        return res.status(400).json({ data: 'No file body found' });
    }
    fromStream(body)

    res.status(200).json({ name: 'Hello world!' });
}

