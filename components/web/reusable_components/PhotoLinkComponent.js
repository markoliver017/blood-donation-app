import { useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { API_HOST } from '@env';
import { validateUrlImage } from '@components/web/helper/functions';

export default function PhotoLinkComponent({
    link,
    setLink,
    isValidUrl,
    setIsValidUrl,
}) {
    useEffect(() => {
        const checkImageUrl = async () => {
            const isValid = await validateUrlImage(link);

            if (isValid) {
                setIsValidUrl({ status: true, message: '' });
            } else {
                setIsValidUrl({
                    status: false,
                    message: 'Image URL is invalid',
                });
            }
        };

        checkImageUrl();
    }, [link]);

    const handleLinkChange = (e) => {
        const urlValue = e.target.value;
        setLink(urlValue);
    };

    return (
        <div className="w-full">
            {link && isValidUrl.status ? (
                <aside className="w-full">
                    <div className="flex flex-col justify-between items-center p-2 border-2 border-gray-400 border-dashed rounded text-center">
                        <img
                            crossOrigin="anonymous"
                            className="h-48 w-80 cursor-pointer"
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
                <div className="flex flex-col justify-between items-center p-4 border-2 border-gray-400 border-dashed rounded text-center">
                    <img
                        crossOrigin="anonymous"
                        className="h-48 w-80 cursor-pointer"
                        src={`${API_HOST}${'/uploads/default.png'}`}
                    />
                    {link && !isValidUrl.status ? (
                        <small className="error">{isValidUrl.message}</small>
                    ) : (
                        <p className="text-gray-500">Enter a photo URL</p>
                    )}
                </div>
            )}

            {/* {/* <form className="mt-2"> */}
            <input
                type="url"
                value={link}
                onChange={handleLinkChange}
                placeholder="Paste/type your URL here..."
                className={`input mt-2 ${
                    !isValidUrl.status ? 'is-invalid' : ''
                }`}
            />
            {/* </form> */}
        </div>
    );
}
