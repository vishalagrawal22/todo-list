function addPadding(value, padding) {
  return String(value).padStart(padding, "0");
}

function format(date) {
  return (
    addPadding(date.getFullYear(), 4) +
    "-" +
    addPadding(String(date.getMonth() + 1), 2) +
    "-" +
    addPadding(String(date.getDate()), 2)
  );
}

export default format;
