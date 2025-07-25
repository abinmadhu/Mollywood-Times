const isoTimeFormat = (dateString) => {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return localDate.split(",")[1].trim();
};

export default isoTimeFormat;
