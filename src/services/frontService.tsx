export async function TranscribeSoundFile(file: File) {
    let response;
    const baseURL = 'http://localhost:3000/api/BackService';
    const formData = new FormData();
    formData.append('soundfile', file); // a .wav sound file
    formData.append('title', 'sound file title');

    await fetch(baseURL, {
        method: 'POST',
        body: formData,
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
