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
        let baseWidth = width || img.width;
        let baseHeight = height || img.height;

        // Maintain aspect ratio if only one dimension is provided or if resizing generally
        if (width && !height) {
          baseHeight = (img.height / img.width) * width;
        } else if (height && !width) {
          baseWidth = (img.width / img.height) * height;
        }

        const targetBytes = targetSizeKB ? targetSizeKB * 1024 : null;
        
        let bestDataUrl = null;
        let bestSize = Infinity;

        // We will try different scales and qualities to find the sharpest result
        // that matches targetBytes, preferring higher scales (resolutions) first.
        // We start scale from 1.0 (full resolution) down to 0.15 in 0.05 decrements.
        // For each scale, we test qualities from 0.9 down to 0.3.
        let found = false;
        
        if (targetBytes) {
          for (let s = 1.0; s >= 0.15; s -= 0.05) {
            const canvas = document.createElement('canvas');
            const w = Math.max(1, Math.round(baseWidth * s));
            const h = Math.max(1, Math.round(baseHeight * s));
            canvas.width = w;
            canvas.height = h;

            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);

            const qualities = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35];
            for (let q of qualities) {
              const dataUrl = canvas.toDataURL(format, q);
              const sizeBytes = dataUrl.length * 0.75;

              if (sizeBytes <= targetBytes) {
                resolve({
                  dataUrl,
                  size: sizeBytes
                });
                return;
              }
              
              if (sizeBytes < bestSize) {
                bestSize = sizeBytes;
                bestDataUrl = dataUrl;
              }
            }
          }
        }

        // Fallback or no target size specified
        const canvas = document.createElement('canvas');
        canvas.width = baseWidth;
        canvas.height = baseHeight;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, baseWidth, baseHeight);
        ctx.drawImage(img, 0, 0, baseWidth, baseHeight);
        
        const dataUrl = bestDataUrl || canvas.toDataURL(format, 0.9);
        const sizeBytes = bestSize !== Infinity ? bestSize : dataUrl.length * 0.75;
        
        resolve({
          dataUrl,
          size: sizeBytes
        });
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
