// Format date from milliseconds since 1/1/1975 to dd/mm/yyyy
function formatDate() {
  return new Date(Date.now()).toLocaleString();
  // try new Date(Date.now()).toLocaleString().split(',')[0] if format is off
}

module.exports = formatDate;