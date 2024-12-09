import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const memesDir = path.join(process.cwd(), 'public/memes');

    try {
        const files = await fs.promises.readdir(memesDir);
        const validFiles = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
        res.status(200).json(validFiles);
    } catch (error) {
        console.error('Error reading memes directory:', error);
        res.status(500).json({ error: 'Failed to load memes' });
    }
}
