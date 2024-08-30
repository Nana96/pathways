import React from "react";
import { Popover as TinyPopover, PopoverProps } from "react-tiny-popover";

/**
 * Creates Popover containers for showing images when hovering over text in the sections
 */
const Popover = (
  props: Omit<PopoverProps, "isOpen" | "children"> & {
    spanText: string;
  }
) => {
  const { content, transform, spanText } = props;
  const [open, setOpen] = React.useState(false);
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <TinyPopover
      isOpen={open}
      positions={["bottom"]}
      transform={transform}
      transformMode="relative"
      content={content}
    >
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "#bc5a45",
        }}
      >
        {spanText}
      </span>
    </TinyPopover>
  );
};

export default Popover;
