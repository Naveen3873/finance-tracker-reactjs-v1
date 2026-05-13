import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Page({ children }: PropsWithChildren) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 md:px-6 lg:px-8 lg:pb-10"
    >
      {children}
    </motion.main>
  );
}
