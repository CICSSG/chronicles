export function imgurUpload(data: unknown): Promise<any> {
    const apiEndpoint = '/api/upload';
    const formData = new FormData();
    if (data instanceof File) {
        formData.append('file', data);
    } else if (typeof data === 'string') {
        formData.append('imageBase64', data);
    } else {
        throw new Error('Unsupported upload payload');
    }

    return fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
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