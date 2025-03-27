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
import { CircleX, ListPlus, UserPlus } from 'lucide-react';
import { FaExclamationCircle } from 'react-icons/fa';
import { reactIconsFa } from '@components/web/reusable_components/PreloadedIcons';
import { handleError } from '@components/web/helper/functions';
import { storeSubMenu, updateSubMenu } from '@/api/menu/submenuQuery';

const updateSelectOptions = (state, action) => {
    const { type, selected } = action;

    if (type === 'reset') {
        return {
            icon: null,
            has_child: null,
        };
    }

    return { ...state, [type]: selected };
};

const iconOptions = Object.keys(reactIconsFa).map((icon) => ({
    label: icon,
    value: icon,
    icon: icon,
}));

const hasChildOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
];

export default function SubMenuViewModal({
    isOpen,
    onClose,
    submenu,
    onUpdate,
}) {
    const mode = useColorScheme();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useImmer({
        name: submenu.name,
        icon: submenu.icon,
        link: submenu.link,
        ctr: submenu.ctr,
        has_child: submenu.has_child,
    });
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {
            icon: iconOptions.find((icon) => icon.value == submenu.icon),
            has_child: hasChildOptions.find(
                (opt) => opt.value == submenu.has_child,
            ),
        },
    );

    const saveSubmenu = async (data) => {
        try {
            const response = await updateSubMenu(submenu.id, data);
            if (!response.error) {
                onClose();
                onUpdate({
                    title: 'Update Sub-Menu',
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
            title: 'Update Sub Menu',
            text: 'Are you sure you want to update this sub-menu?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            onConfirm: () => saveSubmenu(data), //useState data
            onCancel: () => setProcessing(false),
        });
    };

    const handleSelectedOptions = (type, selected) => {
        setData((draft) => {
            draft[type] = selected?.value;
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
                    className="bg-white dark:bg-gray-800 w-full md:w-6/12"
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
                        className="overflow-visible w-full"
                    >
                        <div className="flex-1 w-full margin-auto items-center space-y-3 p-5 shadow-md rounded bg-gray-200 dark:bg-slate-700">
                            <form className="space-y-3 ">
                                <span className="divider divider-start text-lg underline pb-5 dark:text-blue-500">
                                    {submenu.name}
                                </span>
                                <div>
                                    <div>
                                        <Label>
                                            SubMenu Name:{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            placeholder="Enter sub menu name here"
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.name && (
                                                <span className="flex-items-center">
                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label>Has Child:</Label>

                                        <Select
                                            className="w-full select-container"
                                            classNamePrefix="select"
                                            placeholder="Has child? * (required)"
                                            closeMenuOnSelect={true}
                                            options={[
                                                { label: 'Yes', value: 1 },
                                                { label: 'No', value: 0 },
                                            ]}
                                            onChange={(selectedValue) =>
                                                handleSelectedOptions(
                                                    'has_child',
                                                    selectedValue,
                                                )
                                            }
                                            value={selectedState.has_child}
                                            styles={getSingleStyle(mode)}
                                            isClearable
                                        />
                                        <div className="error">
                                            {errors.has_child && (
                                                <span className="flex-items-center">
                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                    {errors.has_child}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>
                                            Link:{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <input
                                            type="text"
                                            name="link"
                                            value={data.link}
                                            placeholder="Enter URL here"
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.link && (
                                                <span classlink="flex-items-center">
                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                    {errors.link}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>
                                            Control:{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <input
                                            type="number"
                                            min={0}
                                            name="ctr"
                                            value={data.ctr}
                                            placeholder="0"
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.ctr && (
                                                <span classlink="flex-items-center">
                                                    <FaExclamationCircle className="h-3 w-3" />{' '}
                                                    {errors.ctr}
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
                                            getOptionLabel={(option) => (
                                                <div className="flex items-center gap-3">
                                                    <IconPickerItem
                                                        value={option.icon}
                                                        size={15}
                                                        color={
                                                            mode == 'light'
                                                                ? '#000'
                                                                : '#FFF'
                                                        }
                                                    />
                                                    <span>{option.label}</span>
                                                </div>
                                            )}
                                            onChange={(selectedValue) =>
                                                handleSelectedOptions(
                                                    'icon',
                                                    selectedValue,
                                                )
                                            }
                                            value={selectedState.icon}
                                            styles={getSingleStyle(mode)}
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
                                <ListPlus className="h-4 w-4" />
                            )}
                            <span>Add Sub Menu</span>
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
        // width: '50%',
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
