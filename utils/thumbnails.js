import fs from 'fs';
import imageThumbnail from 'image-thumbnail';

/**
 * Generate thumbnails for a file
 * @param {string} localPath - path to file in local storage
 * @param {number[]} sizes - array of thumbnail sizes (default: [100, 250, 500])
 * @throws {Error} If the file is not found or thumbnail generation fails
 */
async function generateThumbnail(localPath, sizes = [100, 250, 500]) {
  try {
    // Check if file exists in local storage
    if (!fs.existsSync(localPath)) {
      throw new Error('File not found');
    }

    // Create thumbnails
    const thumbnailPromises = sizes.map(async (thumbnailSize) => {
      try {
        const thumbnail = await imageThumbnail(localPath, { width: thumbnailSize });
        return { size: thumbnailSize, data: thumbnail };
      } catch (err) {
        console.error(`Error generating ${thumbnailSize}px thumbnail:`, err);
        return null;
      }
    });

    const thumbnails = await Promise.all(thumbnailPromises);

    // Store thumbnails in local storage
    thumbnails.forEach((thumbnail) => {
      if (thumbnail) {
        const thumbnailPath = `${localPath}_${thumbnail.size}`;
        fs.writeFileSync(thumbnailPath, thumbnail.data);
        console.log(`Thumbnail created: ${thumbnailPath}`);
      }
    });

    console.log('Thumbnail generation completed');
  } catch (err) {
    console.error('Thumbnail generation failed:', err);
    throw err;
  }
}

export default generateThumbnail;
