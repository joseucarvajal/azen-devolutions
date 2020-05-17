import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadResult } from '@ionic-native/file-transfer';

export const uploadFile = async (serverURL: string, fileName: string, fileContentStr: string): Promise<FileUploadResult> => {
    try {
        const dataToWrite = fileContentStr;

        const fileEntry = await File.createFile(File.dataDirectory, fileName, true);
        const blob = new Blob([dataToWrite], { type: 'text/plain' });
        File.writeFile(File.dataDirectory, fileName, blob, { replace: true, append: false });

        const fileTransferObj = FileTransfer.create();
        const uploadResult = await fileTransferObj
            .upload(fileEntry.nativeURL,
                serverURL,
                {
                    fileKey: 'file',
                    fileName: fileName,
                    mimeType: 'text/plain'
                });

        return uploadResult;
    }
    catch (err) {
        throw err;
    }
}