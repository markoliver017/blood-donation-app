import React, { useEffect, useReducer, useState, forwardRef } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    Pressable,
    View,
    ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import PhotoUploadComponent from '@components/web/reusable_components/PhotoUploadComponent';
import { Label } from 'flowbite-react';
import { getSingleStyle } from '@components/web/custom/select-styles';
import { UserPlus } from 'lucide-react';
import { IconPickerItem } from 'react-icons-picker';
import Select from 'react-select';
import { useColorScheme } from 'react-native';
import { storeUser } from '@/api/users/usersQuery';
import { getAllRoles } from '@/api/roles/rolesQuery';
import { toast } from 'react-toastify';

/* reducer function */
const updateSelectOptions = (state, action) => {
    const { type, selected } = action;

    if (type === 'reset') {
        return {
            role_id: null,
        };
    }

    return { ...state, [type]: selected };
};

const Create = () => {
    const [roleOptions, setRoleOptions] = useState([]);

    const mode = useColorScheme();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {},
    );

    const [modalVisible, setModalVisible] = useState(false);

    const [files, setFiles] = useState([]);
    const [data, setData] = useState({
        user_photo: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        gender: '',
        email: '',
        password: '',
        password_confirmation: '',
        // photo: '',
        file: '',
        role_id: '',
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ['file']: files[0],
        }));
    }, [files]);

    useEffect(() => {
        console.log('dataaaaaaaaaaaaaaaaaaaa', data);
    }, [data]);

    useEffect(() => {
        (async () => {
            try {
                const rolesData = await getAllRoles();
                setRoleOptions(
                    rolesData.map((role) => ({
                        label: role.role_name,
                        value: role.role_name,
                        icon: role.icon,
                        id: role.id,
                    })),
                );
            } catch (error) {
                console.error('Error fetching rolessss:', error);
            }
        })();
    }, []);

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
            alert('successs');
            console.log("responseeeeeeeeeeeeeee", response);
            if (!response.error) {

                toast.success(response.msg, {
                    position: "top-right",
                    autoClose: 5000,
                })
            }

        } catch (error) {
            alert('error');
            const errorData = error.response?.data?.errors || {};
            Object.keys(errorData).forEach((key) => {
                toast.error(errorData[key], {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            });
            // console.error(error);

        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = (e) => {
        alert('submit');
        setProcessing(true);
        e.preventDefault();
        saveUser(data);
    };

    return (
        <>
            <Modal
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
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
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
            <div className="flex justify-center items-center ">
                <div className="w-full max-w-6xl border shadow-md rounded p-5 bg-gray-200 dark:bg-slate-700">
                    <div className="flex flex-wrap">
                        <div className="flex-none w-full md:w-1/4 p-5">
                            <PhotoUploadComponent
                                files={files}
                                setFiles={setFiles}
                            />
                            <div className="error">
                                {errors.user_photo && (
                                    <span>{errors.user_photo}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-3 p-5">
                            <form className="space-y-3">
                                <span className="divider divider-start text-lg underline pb-5">
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
                                            value={data.first_name}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.first_name && (
                                                <span>{errors.first_name}</span>
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
                                            value={data.last_name}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.last_name && (
                                                <span>{errors.last_name}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Middle Name: </Label>
                                        <input
                                            type="text"
                                            name="middle_name"
                                            value={data.middle_name}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.middle_name && (
                                                <span>
                                                    {errors.middle_name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>
                                            Title:{' '}
                                            <small className="italic text-gray-600">
                                                (optional) Atty., Dr., Prof.
                                            </small>
                                        </Label>
                                        <input
                                            type="text"
                                            name="prefix"
                                            value={data.prefix}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.prefix && (
                                                <span>{errors.prefix}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>
                                            Post-nominal:{' '}
                                            <small className="italic text-gray-600">
                                                (optional) Phd, CPA, DIT
                                            </small>
                                        </Label>
                                        <input
                                            type="text"
                                            name="suffix"
                                            value={data.suffix}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.suffix && (
                                                <span>{errors.suffix}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>
                                            Contact #:
                                            <small className="italic text-gray-600">
                                                (optional)
                                            </small>
                                        </Label>
                                        <input
                                            type="text"
                                            name="contact_number"
                                            value={data.contact_number}
                                            onChange={handleInputChange}
                                            placeholder="+639XXXXXXXXX or 09XXXXXXXXX"
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.contact_number && (
                                                <span>
                                                    {errors.contact_number}
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
                                            closeMenuOnSelect={true}
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
                                            getOptionLabel={(option) => (
                                                <div className="flex items-center gap-3">
                                                    <IconPickerItem
                                                        value={option.icon}
                                                        size={24}
                                                        color="#000"
                                                    />
                                                    <span>{option.label}</span>
                                                </div>
                                            )}
                                            onChange={(selectedValue) =>
                                                handleSelectedOptions(
                                                    'gender',
                                                    selectedValue,
                                                )
                                            }
                                            value={selectedState.gender}
                                            styles={getSingleStyle(mode)}
                                            isClearable
                                        />
                                        <div className="error">
                                            {errors.gender && (
                                                <span>{errors.gender}</span>
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

                                <div className="divider divider-start text-lg underline pt-8">
                                    System Credentials
                                </div>

                                <div>
                                    <div>
                                        <Label>Role:</Label>

                                        <Select
                                            className="w-full select-container"
                                            classNamePrefix="select"
                                            placeholder="Role * (required)"
                                            closeMenuOnSelect={true}
                                            options={roleOptions}
                                            onChange={(selectedValue) =>
                                                handleSelectedOptions(
                                                    'role_id',
                                                    selectedValue,
                                                )
                                            }
                                            getOptionLabel={(option) => (
                                                <div className="flex items-center gap-3">
                                                    <IconPickerItem
                                                        value={option.icon}
                                                        size={24}
                                                        color="#000"
                                                    />
                                                    <span>{option.label}</span>
                                                </div>
                                            )}
                                            value={selectedState.role}
                                            styles={getSingleStyle(mode)}
                                            isClearable
                                        />
                                        <div className="error">
                                            {errors.role_id && (
                                                <span>{errors.role_id}</span>
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
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.email && (
                                                <span>{errors.email}</span>
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
                                            value={data.password}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.password && (
                                                <span>{errors.password}</span>
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
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="pt-5 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="button"
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
        height: '500px',
        width: '50%',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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
