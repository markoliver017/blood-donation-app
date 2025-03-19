import React, { useEffect, useReducer, useState } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    ActivityIndicator,
    ScrollView,
    useColorScheme,
} from 'react-native';
import Modal from 'react-native-modal';
import PhotoUploadComponent from '@components/web/reusable_components/PhotoUploadComponent';
import PhotoLinkComponent from '@components/web/reusable_components/PhotoLinkComponent';
import { Label } from 'flowbite-react';
import { getSingleStyle } from '@components/web/custom/select-styles';
import { CircleX, UserPlus } from 'lucide-react';
import { IconPickerItem } from 'react-icons-picker';
import Select from 'react-select';
import { storeUser } from '@/api/users/usersQuery';
import { toast, ToastContainer } from 'react-toastify';
import { FaExclamationCircle } from 'react-icons/fa';
import SweetAlert from '@components/web/helper/SweetAlert';

/* reducer function */
const updateSelectOptions = (state, action) => {
    const { type, selected } = action;

    if (type === 'reset') {
        return {
            role_id: null,
            gender: null,
        };
    }

    return { ...state, [type]: selected };
};

const initialData = {
    first_name: '',
    last_name: '',
    middle_name: '',
    prefix: '',
    suffix: '',
    contact_number: '',
    gender: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    file: '',
    role_id: '',
    file_type: 'file_upload',
    photo_url: '',
};

const Create = ({ isOpen, onClose, onSave, roleOptions }) => {
    const mode = useColorScheme();

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [files, setFiles] = useState([]);
    const [data, setData] = useState(initialData);
    const [isValidUrl, setIsValidUrl] = useState({
        status: false,
        message: '',
    });
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {},
    );

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ['file']: files[0],
        }));
    }, [files]);

    useEffect(() => {
        console.log('dataaaaaaaaaaaaaaaaaaaa', data);
        console.log('errors', errors);
        console.log('selectedOptions', selectedState);
        console.log('roleOptions', roleOptions);
        if (isOpen) {
            handleReset();
        }
    }, [isOpen]);

    const handleReset = () => {
        setData(initialData);
        setErrors({});
        setProcessing(false);
        setFiles([]);
        dispatchSelectedState({
            type: 'reset',
            selected: null,
        });
    };

    const handleFileTypeChange = (e) => {
        const { value } = e.target;

        setData((prev) => ({
            ...prev,
            file_type: value,
            photo_url: '',
        }));
        setFiles([]);
    };

    const handleSelectedOptions = (type, selected) => {
        setData((prev) => ({
            ...prev,
            [type]: selected?.id || selected?.value,
        }));
        dispatchSelectedState({
            type: type,
            selected: selected,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveUser = async (data) => {
        try {
            const response = await storeUser(data);
            if (!response.error) {
                onClose();
                onSave({
                    title: 'Add New User',
                    status: 'success',
                    message: response.msg,
                });
            }
        } catch (error) {
            if (error.response) {
                const errors = error.response.data;
                if (typeof errors == 'string') {
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
                        setErrors(errorData);
                    } else {
                        const errMessage = error.response?.data?.error;

                        if (typeof errMessage == 'string') {
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
        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = (e) => {
        setProcessing(true);
        e.preventDefault();

        SweetAlert({
            title: 'New User',
            text: 'Are you sure you want to add this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            onConfirm: () => saveUser(data), //useState data
            onCancel: () => setProcessing(false),
        });
    };

    return (
        <>
            <Modal
                isVisible={isOpen}
                onBackdropPress={onClose}
                style={styles.modal}
                id="form-modal"
            >
                <ToastContainer />
                <View style={styles.centeredView}>
                    <View
                        style={styles.modalView}
                        className="bg-white dark:bg-gray-800"
                    >
                        <Pressable
                            style={[styles.button]}
                            className="bg-gray-500 absolute right-5 top-5 z-50 hover:ring hover:ring-red-300"
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>
                                <CircleX />
                            </Text>
                        </Pressable>
                        <ScrollView
                            contentContainerStyle={styles.scrollViewContent}
                        >
                            <div className="flex justify-center items-center ">
                                <div className="w-full max-w-6xl shadow-md rounded p-5 bg-gray-200 dark:bg-slate-700">
                                    <div className="flex flex-wrap">
                                        <div className="flex-none w-full md:w-1/4 ">
                                            {data.file_type ==
                                                'file_upload' && (
                                                <>
                                                    <PhotoUploadComponent
                                                        files={files}
                                                        setFiles={setFiles}
                                                    />
                                                    <div className="error">
                                                        {errors.user_photo && (
                                                            <span>
                                                                {
                                                                    errors.user_photo
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                            {data.file_type == 'online' && (
                                                <PhotoLinkComponent
                                                    link={data.photo_url}
                                                    setLink={(link) =>
                                                        setData((prev) => ({
                                                            ...prev,
                                                            photo_url: link,
                                                        }))
                                                    }
                                                    isValidUrl={isValidUrl}
                                                    setIsValidUrl={
                                                        setIsValidUrl
                                                    }
                                                />
                                            )}

                                            {/* Radio buttons */}
                                            <div className="flex justify-center gap-3 px-4 py-2">
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        name="file_type"
                                                        value="file_upload"
                                                        checked={
                                                            data.file_type ===
                                                            'file_upload'
                                                        }
                                                        onChange={
                                                            handleFileTypeChange
                                                        }
                                                        className="radio bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600"
                                                    />
                                                    &nbsp;File Upload
                                                </Label>
                                                <Label>
                                                    <input
                                                        type="radio"
                                                        name="file_type"
                                                        value="online"
                                                        checked={
                                                            data.file_type ===
                                                            'online'
                                                        }
                                                        onChange={
                                                            handleFileTypeChange
                                                        }
                                                        className="radio bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
                                                    />
                                                    &nbsp;Link
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="flex-1 w-full space-y-3 p-5">
                                            <form className="space-y-3">
                                                <span className="divider divider-start text-lg underline pb-5 dark:text-blue-500">
                                                    Employee Information
                                                </span>
                                                <div>
                                                    <div>
                                                        <Label>
                                                            First Name:{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="first_name"
                                                            value={
                                                                data.first_name
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.first_name && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.first_name
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label>
                                                            Last Name:{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="last_name"
                                                            value={
                                                                data.last_name
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.last_name && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.last_name
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label>
                                                            Middle Name /
                                                            Initial:
                                                            <small className="optional">
                                                                (optional)
                                                            </small>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="middle_name"
                                                            value={
                                                                data.middle_name
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.middle_name && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.middle_name
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>
                                                            Prefix / Title:{' '}
                                                            <small className="optional">
                                                                (optional)
                                                                Atty., Dr.,
                                                                Prof.
                                                            </small>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="prefix"
                                                            value={data.prefix}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.prefix && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.prefix
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>
                                                            Suffix /
                                                            Post-nominal:{' '}
                                                            <small className="optional">
                                                                (optional) Phd,
                                                                CPA, DIT
                                                            </small>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="suffix"
                                                            value={data.suffix}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.suffix && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.suffix
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label>
                                                            Contact #:
                                                            <small className="optional">
                                                                (optional)
                                                            </small>
                                                        </Label>
                                                        <input
                                                            type="text"
                                                            name="contact_number"
                                                            value={
                                                                data.contact_number
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            placeholder="+639XXXXXXXXX or 09XXXXXXXXX"
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.contact_number && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.contact_number
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label>Gender:</Label>

                                                        <Select
                                                            className="w-full select-container"
                                                            classNamePrefix="select"
                                                            placeholder="Gender * (required)"
                                                            closeMenuOnSelect={
                                                                true
                                                            }
                                                            options={[
                                                                {
                                                                    label: 'Male',
                                                                    value: 'male',
                                                                    icon: 'FaMale',
                                                                },
                                                                {
                                                                    label: 'Female',
                                                                    value: 'female',
                                                                    icon: 'FaFemale',
                                                                },
                                                            ]}
                                                            getOptionLabel={(
                                                                option,
                                                            ) => (
                                                                <div className="flex items-center gap-3">
                                                                    <IconPickerItem
                                                                        value={
                                                                            option.icon
                                                                        }
                                                                        size={
                                                                            24
                                                                        }
                                                                        color="#000"
                                                                    />
                                                                    <span>
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            onChange={(
                                                                selectedValue,
                                                            ) =>
                                                                handleSelectedOptions(
                                                                    'gender',
                                                                    selectedValue,
                                                                )
                                                            }
                                                            value={
                                                                selectedState.gender
                                                            }
                                                            styles={getSingleStyle(
                                                                mode,
                                                            )}
                                                            isClearable
                                                        />
                                                        <div className="error">
                                                            {errors.gender && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.gender
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* <div>
                                        <Label>Date of Birth:</Label>

                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.date_of_birth && (
                                                <span>
                                                    {errors.date_of_birth}
                                                </span>
                                            )}
                                        </div>
                                    </div> */}
                                                </div>

                                                <div className="divider divider-start text-lg underline pt-8 dark:text-blue-500">
                                                    System Credentials
                                                </div>

                                                <div>
                                                    <div>
                                                        <Label>Role:</Label>

                                                        <Select
                                                            className="w-full select-container"
                                                            classNamePrefix="select"
                                                            placeholder="Role * (required)"
                                                            closeMenuOnSelect={
                                                                true
                                                            }
                                                            options={
                                                                roleOptions
                                                            }
                                                            onChange={(
                                                                selectedValue,
                                                            ) =>
                                                                handleSelectedOptions(
                                                                    'role_id',
                                                                    selectedValue,
                                                                )
                                                            }
                                                            getOptionLabel={(
                                                                option,
                                                            ) => (
                                                                <div className="flex items-center gap-3">
                                                                    <IconPickerItem
                                                                        value={
                                                                            option.icon
                                                                        }
                                                                        size={
                                                                            24
                                                                        }
                                                                        color="#000"
                                                                    />
                                                                    <span>
                                                                        {
                                                                            option.label
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                            value={
                                                                selectedState.role
                                                            }
                                                            styles={getSingleStyle(
                                                                mode,
                                                            )}
                                                            isClearable
                                                        />
                                                        <div className="error">
                                                            {errors.role_id && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.role_id
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>
                                                            Email:{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.email && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.email
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>
                                                            Password:{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={
                                                                data.password
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.password && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.password
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label>
                                                            Confirm Password:{' '}
                                                            <span className="text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <input
                                                            type="password"
                                                            name="passwordConfirmation"
                                                            value={
                                                                data.passwordConfirmation
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                            className="input"
                                                        />
                                                        <div className="error">
                                                            {errors.password && (
                                                                <span className="flex-items-center">
                                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                    {
                                                                        errors.password
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollView>
                        <div className="w-full pt-2 flex ">
                            <button
                                type="submit"
                                disabled={processing}
                                className="button flex-1 justify-center"
                                onClick={handleSubmit}
                            >
                                {processing ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#00ff00"
                                    />
                                ) : (
                                    <UserPlus className="h-4 w-4" />
                                )}
                                <span>Register</span>
                            </button>
                        </div>
                    </View>
                </View>
            </Modal>
            {/* <Modal
                animationType="slide"
                transparent={true}
                backdropColor={'gray'}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            ></Modal> */}
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minHeight: '500px',
        maxHeight: '95vh',
        width: 'auto',
    },
    scrollViewContent: {
        flexGrow: 1,
        overflowY: 'scroll',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'gray',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Create;
