import React, { useEffect, useReducer, useState, forwardRef } from 'react';
import PhotoUploadComponent from '@components/web/reusable_components/PhotoUploadComponent';
import { Button, Label, Modal } from 'flowbite-react';
import { getSingleStyle } from '@components/web/custom/select-styles';
import { UserPlus } from 'lucide-react';
import { MdBoy, MdGirl } from "react-icons/md";
import Select from 'react-select';
import moment from 'moment';
import { useColorScheme } from 'react-native';

/* reducer function */
const updateSelectOptions = (state, action) => {
    const { type, selected } = action;

    if (type === 'reset') {
        return {
            gender: null,
            role: null,
            blood_type: null,
        };
    }

    return { ...state, [type]: selected };
};

export default function Create() {
    const mode = useColorScheme();
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [selectedState, dispatchSelectedState] = useReducer(
        updateSelectOptions,
        {},
    );

    const [open, setOpen] = useState(false);

    const [files, setFiles] = useState([]);
    const [data, setData] = useState({
        user_photo: '',
        first_name: '',
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ['user_photo']: files[0],
        }));
    }, [files]);

    useEffect(() => {
        console.log('dataaaaaaaaaaaaaaaaaaaa', data);
    }, [data]);

    const handleSelectedOptions = (type, selected) => {
        setData((prev) => ({
            ...prev,
            [type]: selected?.value,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatchSelectedState({ type: 'reset' });
    };

    return (
        <>
            <Modal size='sm' position='bottom-center' popup show={open} onClose={() => setOpen(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                            companies around the world are updating their terms of service agreements to comply.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                            soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpen(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpen(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
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
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <span className="divider divider-start text-lg underline pb-5">
                                    Employee Information
                                    <Button onClick={() => setOpen(true)}>Toggle modal</Button>
                                </span>
                                <div>
                                    <div>
                                        <Label>
                                            First Name:{' '}
                                            <span className="text-red-500">*</span>
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
                                            <span className="text-red-500">*</span>
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
                                                <span>{errors.middle_name}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Label>
                                            Title:{' '}
                                            <small className="italic text-gray-600">
                                                (optional) Comm'r, Atty., Dr., Prof.
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
                                        <Label>Contact #:</Label>
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
                                                <span>{errors.contact_number}</span>
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
                                                    icon: <MdBoy />
                                                },
                                                {
                                                    label: 'Female',
                                                    value: 'female',
                                                    icon: <MdGirl />
                                                },
                                            ]}
                                            getOptionLabel={(option) => (
                                                <div className='flex items-center gap-3'>
                                                    {option.icon}
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

                                    <div>
                                        <Label>Date of Birth:</Label>

                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            className="input"
                                        />
                                        <div className="error">
                                            {errors.date_of_birth && (
                                                <span>{errors.date_of_birth}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <span className="divider divider-start text-lg underline pt-8 pb-5">
                                    System Credentials
                                </span>

                                <div>
                                    <div>
                                        <Label>
                                            Email:{' '}
                                            <span className="text-red-500">*</span>
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
                                    {/* <div>
                                    <Label>Role:</Label>

                                    <Select
                                        className="w-full select-container"
                                        classNamePrefix="select"
                                        placeholder="Role * (required)"
                                        closeMenuOnSelect={true}
                                        options={roles}
                                        onChange={(selectedValue) =>
                                            handleSelectedOptions(
                                                'role_id',
                                                selectedValue,
                                            )
                                        }
                                        value={selectedState.role}
                                        isClearable
                                    />
                                    <div className="error">
                                        {errors.role_id && (
                                            <span>{errors.role_id}</span>
                                        )}
                                    </div>
                                </div> */}
                                    <div>
                                        <Label>
                                            Password:{' '}
                                            <span className="text-red-500">*</span>
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
                                            <span className="text-red-500">*</span>
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
                                    >
                                        {processing ? (
                                            <span className="loading loading-spinner loading-xs"></span>
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
}
