import header from "../../../assets/Vector.svg";

interface LoginHeaderProps {
  label: string;
}
function LoginHeader({ label }: LoginHeaderProps) {
  return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <img src={header} alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-lg">Nest App</span>
        </div>
        <h1 className="font-semibold text-2xl text-gray-800">{label}</h1>
      </div>

  );
}

export default LoginHeader;
