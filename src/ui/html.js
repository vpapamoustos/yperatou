export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function actionValue(value) {
  return encodeURIComponent(value)
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29");
}

export function readActionValue(value) {
  return decodeURIComponent(value);
}

export function formatDateTime(value) {
  if (!value) return "-";

  return new Date(value).toLocaleString("el-GR", {
    dateStyle: "short",
    timeStyle: "short"
  });
}
