import sharp from "sharp";

// Resize & Compress Function
const processImage = async (buffer, outputPath) => {
  let quality = 80; // Start with high quality
  let resizedBuffer;
  const width = 1280; // Example width for 16:9 aspect ratio
  const height = Math.round(width * (9 / 16)); // Calculate height

  do {
    // Resize to 16:9 and compress
    resizedBuffer = await sharp(buffer)
      .resize(width, height, { fit: "cover", position: "center" })
      .jpeg({ quality }) // Compress JPEG quality
      .toBuffer();

    quality -= 5; // Reduce quality if too big
  } while (resizedBuffer.length > 1_500_000 && quality > 10); // Stop at 1.5MB or min quality

  await sharp(resizedBuffer).toFile(outputPath);
};

export default processImage;
