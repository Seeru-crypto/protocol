export async function TranscribeSoundFile(file: File) {
    let response;
    const baseURL = 'http://localhost:3000/api/BackService';
    const jsonFile = new Blob([JSON.stringify(file)], {
        type: 'application/json',
    });
    const jsonData = { title: 'A file title', soundFile: JSON.stringify(file) };

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
