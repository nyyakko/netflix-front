import type { HTMLInputTypeAttribute } from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

const InputFieldState = {
    'OK': '',
    'MISSING_FIELD': 'O campo de {{field}} é necessário.',
    'INVALID_VALUE': 'Informe um {{field}} válido.'
};

export type InputFieldState = keyof typeof InputFieldState;

interface InputFieldProps<T> {
    field: keyof T;
    placeholder?: string;
    required?: boolean;
    state: InputFieldState;
    type: HTMLInputTypeAttribute;
    value: T;
    setValue: React.Dispatch<React.SetStateAction<T>>;
};

export default function InputField<T>(props: InputFieldProps<T>)
{
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue?.({ ...props.value, [props.field]: event.target.value });
    };

    return (
        <div className='block mb-5'>
            <input
                required={props.required}
                placeholder={props.placeholder}
                type={props.type}
                className={`shadow px-4 py-3 rounded border ${props.state != Object.keys(InputFieldState)[0] ? 'border-red-400' : 'border-gray-400'} w-full text-gray-100 backdrop-blur-sm`}
                onChange={onChange}
            >
            </input>
            {
                props.state != Object.keys(InputFieldState)[0]
                    ?
                        <div className='mt-2 flex gap-1.5'>
                            <FaRegCircleXmark className='fill-red-400'/>
                            <small className='text-red-400'>{InputFieldState[props.state]?.replace('{{field}}', props.placeholder?.toLowerCase()!)}</small>
                        </div>
                    : <></>
            }
        </div>
    );
}
