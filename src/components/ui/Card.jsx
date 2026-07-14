const Card = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border bg-white p-6 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;