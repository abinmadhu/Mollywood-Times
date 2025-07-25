export const formatDateString = (isoString) => {
  const date = new Date(isoString);

  const options = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleString('en-US', options);
};
