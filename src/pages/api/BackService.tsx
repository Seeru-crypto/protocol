import { log } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

const region = 'norwayeast';
const baseURL = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
const languageOption = 'et-EE';
const fullUrl = baseURL + '?language=' + languageOption;
const key = 'e3f373f2939b4444814c9e0b5b5cae8f';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response;
    log('query', req.query);
    log(req.body.file === undefined, typeof req.body.file);
    const soundfile: File = JSON.parse(req.body.file);
    log('soundfile', soundfile.name);
    // https://norwayeast.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=et-EE
    await fetch(fullUrl, {
        method: 'POST',
        body: soundfile,
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
