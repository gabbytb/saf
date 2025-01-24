const ButtonSubmit = ({ btnType, btnProps, btnBg, label, }) => {

    return (
        <button type={btnType} className={`${btnProps} ${btnBg ? `${btnBg}` : 'bg-transparent'}`}>
            {label}
        </button>
    );
};


export default ButtonSubmit;