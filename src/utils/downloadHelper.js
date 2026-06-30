/**
 * Global utility for downloading files in the browser
 */
export const downloadFile = async (dataUrlOrBlob, filename) => {
  const link = document.createElement('a');
  let isCreatedBlob = false;
  
  if (dataUrlOrBlob instanceof Blob) {
    link.href = URL.createObjectURL(dataUrlOrBlob);
    isCreatedBlob = true;
  } else if (typeof dataUrlOrBlob === 'string' && dataUrlOrBlob.startsWith('http')) {
    try {
      const response = await fetch(dataUrlOrBlob);
      const blob = await response.blob();
      link.href = URL.createObjectURL(blob);
      isCreatedBlob = true;
    } catch (e) {
      console.warn("Failed to fetch blob for cross-origin link, falling back to direct url", e);
      link.href = dataUrlOrBlob;
      link.target = '_blank';
    }
  } else {
    link.href = dataUrlOrBlob;
  }
  
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    if (isCreatedBlob) {
      URL.revokeObjectURL(link.href);
    }
  }, 150);
};
