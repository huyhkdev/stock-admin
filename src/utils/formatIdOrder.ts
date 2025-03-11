export const formatIdOrder = (id: string | number, option: "o" | "m") => {
  return "#" + option.toUpperCase() + id.toString().padStart(5, "0");
};
