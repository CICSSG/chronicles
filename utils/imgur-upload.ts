export function imgurUpload(data: unknown): Promise<any> {
    const apiEndpoint = '/api/upload';

    let base64Img = data;
    if (typeof base64Img == 'string') {
        base64Img = base64Img.replace(/^data:.+base64,/, '');
    }

    console.log(base64Img)
    return fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({ image: base64Img }),
    })
        .then((res) => res.json())
        .then((response) => {
            return response.message;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}