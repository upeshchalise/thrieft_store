import React from "react";

const Footer: React.FC = () => {
  const date = new Date().getFullYear();
  return (
    <div className="bg-gray-200 text-center bottom-0 fixed w-full py-2">
      &copy; thrift store test {date}
    </div>
  );
};

export default Footer;
