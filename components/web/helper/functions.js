import { toast } from 'react-toastify';

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

export const handleError = (error, setErrors) => {
    if (error.response) {
        const errors = error.response.data;

        if (typeof errors === 'string') {
            toast.error(errors, {
                position: 'bottom-right',
                autoClose: 5000,
            });
        } else {
            const errorData = error.response.data?.errors || {};
            const errorArray = Object.keys(errorData);

            if (errorArray.length) {
                errorArray.forEach((key) => {
                    toast.error(errorData[key], {
                        position: 'bottom-right',
                        autoClose: 5000,
                    });
                });

                if (setErrors) {
                    setErrors(errorData);
                }
            } else {
                const errMessage = error.response?.data?.error;
                if (typeof errMessage === 'string') {
                    toast.error(errMessage, {
                        position: 'bottom-right',
                        autoClose: 5000,
                    });
                }
            }
        }
    } else {
        toast.error(error.message, {
            position: 'bottom-right',
            autoClose: 5000,
        });
    }
};
