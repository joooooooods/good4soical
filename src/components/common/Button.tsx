type ButtonProps = {
    label: string;
    onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="w-full h-[40px] flex items-center justify-center bg-purple-700 text-white rounded-[10px]"
        >
            <span>{label}</span>
        </button>
    );
};

export default Button;
