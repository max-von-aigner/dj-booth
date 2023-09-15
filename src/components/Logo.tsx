import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "25%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
      }}
      // className="flex justify-center  border-black border-8 rounded-2xl mx-auto -mt-20 mb-12 px-2 "
      className="flex justify-center  border-black border-8 rounded-2xl mx-auto px-2 "
    >
      <span className="font-sans font-bold text-black text-5xl  ">Booth</span>
    </motion.div>
  );
};

export default Logo;

{
  /* <motion.div animate={{ x: [0, 100, 0] }} />; */
}
