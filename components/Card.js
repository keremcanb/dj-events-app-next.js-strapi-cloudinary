const Card = ({ children }) => (
  <div className="grid md:grid-cols-3 justify-items-center items-center gap-3 | bg-gray-100 bg-opacity-95 | border-2 border-opacity-60 border-solid rounded-xl | hover:bg-gray-200 hover:border-transparent transition-colors duration-500 | mb-5 p-5">
    {children}
  </div>
);

export default Card;
