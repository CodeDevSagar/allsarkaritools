/**
 * Client-side image resizing and compression
 */
export const resizeImageClient = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const { width, height, targetSizeKB, format = 'image/jpeg' } = options;
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let targetWidth = width || img.width;
        let targetHeight = height || img.height;

        // Maintain aspect ratio if only one dimension is provided
        if (width && !height) {
          targetHeight = (img.height / img.width) * width;
        } else if (height && !width) {
          targetWidth = (img.width / img.height) * height;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Quality iterative compression
        let quality = 0.9;
        let dataUrl = canvas.toDataURL(format, quality);
        
        if (targetSizeKB) {
          const targetBytes = targetSizeKB * 1024;
          // Binary search or iterative approach for quality
          while (dataUrl.length * 0.75 > targetBytes && quality > 0.1) {
            quality -= 0.05;
            dataUrl = canvas.toDataURL(format, quality);
          }
        }

        resolve({
          dataUrl,
          size: Math.round(dataUrl.length * 0.75 / 1024) + ' KB'
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
