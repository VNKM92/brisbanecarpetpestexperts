export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export const floatSlow = {
  animate: {
    y: [0, -25, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
    },
  },
};

export const floatFast = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
    },
  },
};
