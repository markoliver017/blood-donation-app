export const validateUrlImage = async (urlString) => {
    try {
        const response = await fetch(urlString);
        if (
            response.ok &&
            response.headers.get('Content-Type')?.includes('image/')
        ) {
            console.log('Image URL is valid');
            return true;
        } else {
            console.log('Image URL is invalid');
            return false;
        }
    } catch (error) {
        console.error('Error validating image URL:', error);
        return false;
    }
};
