/**
 * Global utility for downloading files in the browser
 */
export const downloadFile = (dataUrlOrBlob, filename) => {
  const link = document.createElement('a');
  
  if (dataUrlOrBlob instanceof Blob) {
    link.href = URL.createObjectURL(dataUrlOrBlob);
  } else {
    link.href = dataUrlOrBlob;
  }
  
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    if (dataUrlOrBlob instanceof Blob) {
      URL.revokeObjectURL(link.href);
    }
  }, 100);
};
