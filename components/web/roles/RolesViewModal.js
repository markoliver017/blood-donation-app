import React, { useEffect, useReducer, useState } from 'react';
import { API_HOST } from '@env';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    ActivityIndicator,
    ScrollView,
    useColorScheme,
    Switch,
} from 'react-native';
import { useImmer } from 'use-immer';
import Modal from 'react-native-modal';
import { Label } from 'flowbite-react';
import { getSingleStyle } from '@components/web/custom/select-styles';
import { CircleX, Save, UserPlus } from 'lucide-react';
import { IconPickerItem } from 'react-icons-picker';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import { FaExclamationCircle } from 'react-icons/fa';
import { reactIconsFa } from '@components/web/reusable_components/PreloadedIcons';

import SweetAlert from '@components/web/helper/SweetAlert';
import { handleError } from '../helper/functions';
import { updateRole } from '@/api/roles/rolesQuery';

const iconOptions = Object.keys(reactIconsFa).map((icon) => ({
    label: icon,
    value: icon,
    icon: icon,
}));
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

const RolesViewModal = ({ isOpen, onClose, onUpdate, role }) => {
    const mode = useColorScheme();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {
            icon: iconOptions.find((icon) => icon.value == role.icon),
        },
    );

    const initialData = {
        role_name: role?.role_name || '',
        icon: role?.icon || '',
    };

    const [data, setData] = useImmer(initialData);

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

    const handleSave = async (data) => {
        try {
            const response = await updateRole(role.id, data);
            console.log('update responseee successss', response);
            if (!response.error) {
                onUpdate({
                    title: 'Update Role',
                    status: 'success',
                    message: response.msg,
                });
                onClose();
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
            title: 'Update Role Information',
            text: 'Are you sure you want to update this role?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            onConfirm: () => handleSave(data),
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
                <View style={styles.centeredView}>
                    <View
                        style={styles.modalView}
                        className="bg-white dark:bg-gray-800"
                    >
                        <ToastContainer />
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
                                        <form className="space-y-3">
                                            <span className="divider divider-start text-lg underline pb-5 dark:text-blue-500">
                                                Update Role Information
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
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="input"
                                                    />
                                                    <div className="error">
                                                        {errors.role_name && (
                                                            <span className="flex-items-center">
                                                                <FaExclamationCircle className="h-3 w-3" />{' '}
                                                                {
                                                                    errors.role_name
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label>Icon:</Label>

                                                    <Select
                                                        className="w-full select-container"
                                                        classNamePrefix="select"
                                                        placeholder="Icon * (required)"
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
                                                                'icon',
                                                                selectedValue,
                                                            )
                                                        }
                                                        value={
                                                            selectedState.icon
                                                        }
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
                                <span>Update</span>
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
        zIndex: 10,
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

export default RolesViewModal;
