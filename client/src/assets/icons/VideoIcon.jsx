const VideoIcon = (props) => {
    return (
        <svg
            width={44}
            height={44}
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            svg-inline=""
            role="presentation"
            focusable="false"
            tabIndex={-1}
            {...props}
        >
            <circle opacity={0.3} cx={22} cy={22} r={22} fill="#000" />
            <path
            d="M30.25 20.412c1.222.706 1.222 2.47 0 3.176l-11 6.35c-1.222.706-2.75-.176-2.75-1.587V15.649c0-1.411 1.528-2.293 2.75-1.587l11 6.35z"
            fill="#fff"
            />
        </svg>
    );
}
export default VideoIcon;
