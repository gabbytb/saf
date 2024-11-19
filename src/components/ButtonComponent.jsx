const ButtonComponent = ({ btnType, btnProps, btnBg, label }) => {

    
    function clickFunction() {
        var invstmentOverlay = document.getElementById('investmentOverlay');
        if (invstmentOverlay.classList.contains('ease-out-anime') ) {
            invstmentOverlay.classList.remove('ease-out-anime');
        };

        invstmentOverlay.classList.add('ease-out-anim');
    };

   
    return (
        <button type={btnType} className={`${btnProps} ${btnBg ? 'bg-blue-600' : 'bg-transparent'}`} onClick={clickFunction}>
            {label}
        </button>
    );
};


export default ButtonComponent;
