import { decode as base64_decode } from 'base-64';
import { log } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

const region = 'norwayeast';
const baseURL = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const languageOption = 'et-EE';
const fullUrl = baseURL + '?language=' + languageOption;
const key = '';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response;
    const body = req.body;

    console.log('body: ', typeof body);
    if (!body.title || !body.soundFile) {
        return res.status(400).json({ data: 'title or file not found' });
    }
    const decodedFile = base64_decode(body.soundFile);

    const parts = [
        new Blob([decodedFile], {
            type: '.wav',
        }),
        new Uint16Array([33]),
    ];

    const file: File = new File(parts, 'sample.txt', {
        type: '.wav',
    });

    // https://norwayeast.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=et-EE
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
        .then((data) => {
            response = data;
        })
        .catch((error) => {
            throw new Error(`HTTP Error: ${error}`);
        });
    log('res: ', { response });

    res.status(200);
}

// res.status(200).json({ name: 'Hello world!' });
