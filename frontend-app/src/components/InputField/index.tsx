type InputFieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    
};

const InputField = ({ label, name, value, onChange, type = "text", placeholder}: InputFieldProps) => {
    return (
        <div>
            <label htmlFor="{label}" className="block font-medium mb-1">{label}</label>
            <input id={name} name={name} type={type} value={value} onChange={onChange} className="w-full border px-2 py-2 rounded" placeholder={placeholder} required/>
        </div>
        );
};

export default InputField;