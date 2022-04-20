import sharp from 'sharp';

function sizing(input: string, width: number | null | undefined, height: number | null | undefined) {
    const size = sharp(__dirname + `/images/${input}.jpg`)
        .resize(width, height, { fit: 'fill' })
        .toFormat('webp')
        .toFile(__dirname + `/processed/${input}-${width}*${height}.webp`);

    return size;
}

export default sizing;
