import { IconType } from "react-icons";
import React, { Dispatch, SetStateAction} from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  href
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  notifs?: number;
  href: string;
}) => {
  return (
    <Link href={href}
      onClick={() => setSelected(title)}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-neutral-300 text-neutral-800" : "text-slate-500 hover:bg-slate-100"}`}>

      <motion.div
        layout
        className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium"
        >
          {title}
        </motion.span>
      )}

      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-pink-400 text-xs text-white text-center">
          {notifs}
        </motion.span>
      )}
    </Link>
  );
};

export default Option