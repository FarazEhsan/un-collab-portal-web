import {BlobServiceClient} from "@azure/storage-blob";

async function uploadImage(containerName: string, file: any) {
    const sasToken = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-12-30T03:55:20Z&st=2024-01-21T19:55:20Z&spr=https,http&sig=H8RR4rew46jvp9TlFV3SFzFaCFovj80n4TwHbn0%2FJu4%3D";
    const account = "unhabitatfiles";
    const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(file.name);
    const blockBlobClient = blobClient.getBlockBlobClient();
    const result = await blockBlobClient.uploadBrowserData(file, {
        blockSize: 4 * 1024 * 1024,
        concurrency: 20,
        onProgress: ev => console.log(ev)
    });
    return blobClient.url
}

export default uploadImage;
