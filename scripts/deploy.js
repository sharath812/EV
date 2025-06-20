import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { readdir } from 'fs/promises';

// Load environment variables
config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Configure AWS SDK
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const DIST_FOLDER = join(__dirname, '..', 'dist');
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

// Function to get the content type based on file extension
function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const contentTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
  };
  return contentTypes[ext] || 'application/octet-stream';
}

// Function to recursively get all files in a directory
async function getAllFiles(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  const paths = [];

  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      paths.push(...(await getAllFiles(path)));
    } else {
      paths.push(path);
    }
  }

  return paths;
}

// Main deploy function
async function deployToS3() {
  try {
    console.log('Starting deployment to S3...');

    // Get all files from the dist folder
    const files = await getAllFiles(DIST_FOLDER);

    // Upload each file to S3
    for (const filePath of files) {
      const fileContent = await readFile(filePath);
      const key = filePath.replace(DIST_FOLDER + '/', '');

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: getContentType(filePath),
      });

      await s3Client.send(command);
      console.log(`Uploaded: ${key}`);
    }

    console.log('Deployment completed successfully!');
    console.log(`Website URL: http://${BUCKET_NAME}.s3-website-${process.env.AWS_REGION}.amazonaws.com`);
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deployToS3();