import React from "react";

const DEFAULT_SIZE = 32;

interface Props {
  size?: number;
  color?: string;
}

const TrashIcon: React.FunctionComponent<Props> = ({ size, color, ...rest }) => (
  <svg
    fillRule="evenodd"
    clipRule="evenodd"
    width={size || DEFAULT_SIZE}
    height={size || DEFAULT_SIZE}
    {...rest}
    fill={ color || "white"}
    style={{position: "relative", top: "4px", left: "-5px"}}
  >
    <path d="M9 3h6V1.25a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V3zm11 1H4v18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4zM10 7.5a.5.5 0 0 0-1 0v12a.5.5 0 0 0 1 0v-12zm5 0a.5.5 0 0 0-1 0v12a.5.5 0 0 0 1 0v-12zM23 3v1h-2v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4H1V3h7V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h7z" />
  </svg>
);

export default TrashIcon;
