import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { API_HOST } from '@env';

export default function PhotoLinkComponent({ link, setLink }) {
    const [isValidUrl, setIsValidUrl] = useState({
        status: false,
        message: '',
    });

    const validateUrl = (urlString) => {
        fetch(urlString)
            .then((response) => {
                if (
                    response.ok &&
                    response.headers.get('Content-Type').includes('image/')
                ) {
                    console.log('Image URL is valid');
                    setIsValidUrl({ status: true, message: '' });
                } else {
                    setIsValidUrl({
                        status: false,
                        message: 'Image URL is invalid',
                    });
                    console.log('Image URL is invalid');
                }
            })
            .catch((error) => {
                console.error('Error validating image URL:', error);
                setIsValidUrl({
                    status: false,
                    message: 'Image URL is invalid',
                });
            });
    };

    useEffect(() => {
        validateUrl(link);
    }, [link]);

    const handleLinkChange = (e) => {
        const urlValue = e.target.value;
        setLink(urlValue);
    };

    return (
        <div className="photo-link-component w-full">
            {link && isValidUrl.status ? (
                <aside className="w-full">
                    <div className="flex flex-col justify-between items-center p-2 border-2 border-gray-400 border-dashed rounded text-center">
                        <img
                            crossOrigin="anonymous"
                            className="min-h-52 w-auto cursor-pointer"
                            src={link}
                        />

                        <button
                            className="btn btn-sm btn-neutral w-24 mt-2"
                            onClick={() => setLink('')}
                        >
                            Change
                        </button>
                    </div>
                </aside>
            ) : (
                <aside className="w-full">
                    <div className="flex flex-col justify-between items-center p-2 border-2 border-gray-400 border-dashed rounded text-center">
                        <img
                            crossOrigin="anonymous"
                            className="min-h-52 w-auto cursor-pointer"
                            src={`${API_HOST}${'/uploads/default.png'}`}
                        />
                        {link && !isValidUrl.status ? (
                            <small className="error">
                                {isValidUrl.message}
                            </small>
                        ) : (
                            <p className="text-gray-500">Enter a photo URL</p>
                        )}
                    </div>
                </aside>
            )}

            <form className="mt-2">
                <input
                    type="url"
                    value={link}
                    onChange={handleLinkChange}
                    placeholder="Paste/type your URL here..."
                    className={`input ${
                        !isValidUrl.status ? 'is-invalid' : ''
                    }`}
                />
            </form>
        </div>
    );
}
