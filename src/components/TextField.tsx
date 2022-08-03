import { Form } from 'react-bootstrap';
import * as React from 'react';

type TextFieldType = {
    id?: string
    type?: string,
    label: string
    name: string
    required?: boolean
    autoFocus?: boolean;
    autoComplete?: string;
    error?: boolean
    value?: string | string[] | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    helperText?: React.ReactNode;
    errorMsg?: string;
};
const TextField = ({
    id,
    type,
    label,
    name,
    required,
    value,
    autoFocus,
    onChange,
    error,
    errorMsg,
    helperText,
    autoComplete
}: TextFieldType) => {
    return (
        <Form.Group controlId={id}>
            <Form.Control type={type} name={name} placeholder={label} required={required} value={value}
                          autoFocus={autoFocus} onChange={onChange} autoComplete={autoComplete}/>
            {(error || helperText) &&
                <Form.Text style={{color: error ? '#d32f2f' : undefined}} id="passwordHelpBlock"
                           muted={Boolean(helperText)}>{errorMsg || helperText}</Form.Text>}
        </Form.Group>
    );
};

export default TextField;
