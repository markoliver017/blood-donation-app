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
import { useImmer } from 'use-immer';
import { getSingleStyle } from '@components/web/custom/select-styles';
import { IconPickerItem } from 'react-icons-picker';
import Select from 'react-select';
import Modal from 'react-native-modal';
import { Label } from 'flowbite-react';
import { ToastContainer } from 'react-toastify';
import SweetAlert from '@components/web/helper/SweetAlert';
import { CircleX, UserPlus } from 'lucide-react';
import { FaExclamationCircle } from 'react-icons/fa';
import { reactIconsFa } from '@components/web/reusable_components/PreloadedIcons';
import { storeRole } from '@/api/roles/rolesQuery';
import { handleError } from '@components/web/helper/functions';

const updateSelectOptions = (state, action) => {
    const { type, selected } = action;

    if (type === 'reset') {
        return {
            icon: null,
        };
    }

    return { ...state, [type]: selected };
};
const initialData = {
    role_name: '',
    icon: '',
};
const iconOptions = Object.keys(reactIconsFa).map((icon) => ({
    label: icon,
    value: icon,
    icon: icon,
}));

export default function RolesCreateModal({ isOpen, onClose, onSave }) {
    const mode = useColorScheme();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useImmer(initialData);
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {},
    );

    const handleReset = () => {
        setData(initialData);
        setErrors({});
        setProcessing(false);
        dispatchSelectedState({
            type: 'reset',
            selected: null,
        });
    };

    useEffect(() => {
        if (isOpen) {
            handleReset();
        }
    }, [isOpen]);

    const saveRole = async (data) => {
        try {
            const response = await storeRole(data);
            if (!response.error) {
                onClose();
                onSave({
                    title: 'Add New Role',
                    status: 'success',
                    message: response.msg,
                });
            }
        } catch (error) {
            handleError(error, setErrors);
        } finally {
            setProcessing(false);
        }
    };

    const handleSubmit = (e) => {
        setProcessing(true);
        e.preventDefault();

        SweetAlert({
            title: 'New Role',
            text: 'Are you sure you want to add this role?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            onConfirm: () => saveRole(data), //useState data
            onCancel: () => setProcessing(false),
        });
    };

    const handleSelectedOptions = (type, selected) => {
        setData((draft) => {
            draft[type] = selected?.value || '';
        });
        dispatchSelectedState({
            type: type,
            selected: selected,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;

        setData((draft) => {
            draft[name] = value;
        });
    };

    return (
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
                        className="overflow-visible"
                    >
                        <div className="flex justify-center items-center ">
                            <div className="w-full max-w-6xl shadow-md rounded p-5 bg-gray-200 dark:bg-slate-700">
                                <div className="flex-1 w-full space-y-3 p-5">
                                    <form className="space-y-3 ">
                                        <span className="divider divider-start text-lg underline pb-5 dark:text-blue-500">
                                            Add New Role
                                        </span>
                                        <div>
                                            <div>
                                                <Label>
                                                    Role Name:{' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </Label>
                                                <input
                                                    type="text"
                                                    name="role_name"
                                                    value={data.role_name}
                                                    placeholder="Enter role name here"
                                                    onChange={handleInputChange}
                                                    className="input"
                                                />
                                                <div className="error">
                                                    {errors.role_name && (
                                                        <span className="flex-items-center">
                                                            <FaExclamationCircle className="h-3 w-3" />{' '}
                                                            {errors.role_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Label>Icon:</Label>

                                                <Select
                                                    className="w-full select-container"
                                                    classNamePrefix="select"
                                                    placeholder="Icon * (optional)"
                                                    closeMenuOnSelect={true}
                                                    options={iconOptions}
                                                    getOptionLabel={(
                                                        option,
                                                    ) => (
                                                        <div className="flex items-center gap-3">
                                                            <IconPickerItem
                                                                value={
                                                                    option.icon
                                                                }
                                                                size={15}
                                                                color={
                                                                    mode ==
                                                                    'light'
                                                                        ? '#000'
                                                                        : '#FFF'
                                                                }
                                                            />
                                                            <span>
                                                                {option.label}
                                                            </span>
                                                        </div>
                                                    )}
                                                    onChange={(selectedValue) =>
                                                        handleSelectedOptions(
                                                            'icon',
                                                            selectedValue,
                                                        )
                                                    }
                                                    value={selectedState.icon}
                                                    styles={getSingleStyle(
                                                        mode,
                                                    )}
                                                    isClearable
                                                />
                                                <div className="error">
                                                    {errors.icon && (
                                                        <span className="flex-items-center">
                                                            <FaExclamationCircle className="h-3 w-3" />{' '}
                                                            {errors.icon}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
                            <span>Add</span>
                        </button>
                    </div>
                </View>
            </View>
        </Modal>
    );
}

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
        minHeight: 'auto',
        maxHeight: '95vh',
        width: 'auto',
    },
    scrollViewContent: {
        flexGrow: 1,
        overflowY: 'visible',
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
