import captureWebsite from 'capture-website';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import { getLinkPreview } from 'link-preview-js';

import path from 'path';
const __dirname = path.resolve();
const dir_path = `${__dirname}/assets/images`;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export const generate_preview_img = async (URL: string) => {
    const head = getRandomArbitrary(1, 1000);
    const tail = getRandomArbitrary(1, 1000);
    const img_name = `${dir_path}/${head}${Date.now()}${tail}.jpeg`;

    const imgURL = await getLinkPreview(URL);

    // await captureWebsite.file(URL, img_name, {
    //     //emulateDevice: 'iPhone X',

    //     type: "jpeg",
    //     quality: 0.6
    // });

    // const img_URL = await cloudinary.uploader.upload(img_name,
    //     {
    //         folder: 'urls_preview',
    //     },
    //     async function (error, result) {
    //         await fs.unlink(img_name);
    //     });
    const result = {
        images: [],
        ...imgURL,
    }
    console.log(result.images[0])
    return  result.images[0]? result.images[0]: '';//img_URL?.url;
}