import React from "react";

const Star = ({ selected }: { selected: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${
        selected ? "text-blue-500 fill-current" : "text-gray-500 fill-current"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {selected ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2.039L12.54 7.5H18.783L13.865 11.649L16.404 17.001L10 13.686L3.596 17L6.135 11.649L1.217 7.5H7.46L10 2.039Z"
        />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2.039L12.54 7.5H18.783L13.865 11.649L16.404 17.001L10 13.686L3.596 17L6.135 11.649L1.217 7.5H7.46L10 2.039ZM10 4.47L7.46 9.282H2.77L6.188 12.171L4.648 16.001L10 13.471L15.352 16.001L13.812 12.171L17.23 9.282H12.54L10 4.47Z"
        />
      )}
    </svg>
  );
};

export default Star;
