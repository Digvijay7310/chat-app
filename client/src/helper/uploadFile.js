const url = `https://api.cloudinary.com/v1_1/:${import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/:auto/upload`

const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append(`file`, file)
    formData.append('upload_preset', 'Dynamic folder')

    const response = await fetch(url, {
        method: "POST",
        body: formData
    })
    const responseData = await response.json()k

    return responseData
}

export default uploadFile