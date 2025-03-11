import { useCallback, useMemo, useState } from 'react';

import { Avatar } from 'flowbite-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useColorScheme } from 'react-native';

// toast.success('Success fetching users!', {
//     position: 'bottom-right',
//     autoClose: 5000,
// });

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#9ca3af',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border .24s ease-in-out',
};

const darkModeStyle = {
    backgroundColor: '#374151', // Dark gray
    borderColor: '#4b5563', // Lighter gray border
    color: '#d1d5db', // Light gray text
};

const focusedStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
};

export default function PhotoUploadComponent({
    files,
    setFiles,
    photo = null,
}) {
    const mode = useColorScheme();
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const [userPhoto, setUserPhoto] = useState(photo);

    const handleDrop = useCallback((acceptedFiles) => {
        const { allowedFiles, notAllowedFiles } = acceptedFiles.reduce(
            (acc, file) => {
                if (allowedTypes.includes(file.type)) {
                    acc.allowedFiles.push(file);
                } else {
                    acc.notAllowedFiles.push(file);
                }
                return acc;
            },
            { allowedFiles: [], notAllowedFiles: [] },
        ); //initial value

        if (notAllowedFiles.length > 0) {
            toast.error(
                <div>
                    <h5>Invalid file format:</h5>
                    <span className="text-red-700">
                        {notAllowedFiles.map((file) => file.name).join(' | ')}
                    </span>
                    <small className="italic block">
                        Only image files (.jpg, .png) are accepted.
                    </small>
                </div>,
                {
                    position: 'bottom-right',
                    autoClose: 5000,
                },
            );
        }

        setFiles(allowedFiles);
    }, []);

    const removeFile = (file) => {
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    };

    const thumbs = files.map((file) => {
        return (
            <div
                key={file.name}
                className="flex flex-col justify-between items-center p-2 border-2 border-gray-400 border-dashed rounded text-center"
            >
                <Avatar
                    img={URL.createObjectURL(file)}
                    alt={file.name}
                    className="min-h-52 w-auto cursor-pointer"
                    onLoad={() => URL.revokeObjectURL(file)}
                    placeholderInitials="AV"
                    size="2xl"
                    rounded
                    bordered
                />

                <button
                    className="btn btn-sm btn-neutral w-24 mt-2"
                    onClick={() => removeFile(file)}
                >
                    Change
                </button>
            </div>
        );
    });

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*',
        multiple: false,
    });
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(mode == 'dark' ? darkModeStyle : {}),
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [mode, isFocused, isDragAccept, isDragReject],
    );

    return (
        <div className="file-upload">
            {files.length === 0 && !userPhoto && (
                <div
                    {...getRootProps({ style })}
                    className={`${isDragActive ? 'active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <Avatar
                        alt="Avatar"
                        className="h-40 w-full text-6xl md:text-7xl xs:text-base font-bold flex items-center justify-center"
                        placeholderInitials="Photo"
                        size="2xl"
                        rounded
                        bordered
                    />
                    <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                </div>
            )}

            <aside className="w-full">{thumbs}</aside>

            {/* {userPhoto && (
                <aside className="w-full">
                    <div className="flex flex-col justify-between items-center p-2 border-2 border-gray-400 border-dashed rounded text-center">
                        <Avatar
                            img={`${assetUrl}/uploads/user_photo/${
                                userPhoto || 'avatar.png'
                            }`}
                            alt={userPhoto}
                            className="min-h-52 w-auto cursor-pointer"
                            placeholderInitials="AV"
                            size="2xl"
                            rounded
                            bordered
                        />

                        <button
                            className="btn btn-sm btn-neutral w-24 mt-2"
                            onClick={() => setUserPhoto(null)}
                        >
                            Change
                        </button>
                    </div>
                </aside>
            )} */}
        </div>
    );
}
