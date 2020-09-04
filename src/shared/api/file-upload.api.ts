import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadResult } from '@ionic-native/file-transfer';

import { trimLasCharacter } from '../../shared/utils/zutils';

export const uploadFile = async (apiURL: string, fileName: string, fileContentStr: string, tkns: string): Promise<FileUploadResult> => {
    try {

        const dataToWrite = fileContentStr;

        const fileEntry = await File.createFile(File.dataDirectory, fileName, true);
        const blob = new Blob([dataToWrite], { type: 'text/plain' });
        File.writeFile(File.dataDirectory, fileName, blob, { replace: true, append: false });

        const fileTransferObj = FileTransfer.create();
        const uploadResult = await fileTransferObj
            .upload(fileEntry.nativeURL,
                `${trimLasCharacter(apiURL, '/')}/api/transferfile`,
                {
                    fileKey: 'file',
                    fileName: fileName,
                    mimeType: 'text/plain',
                    headers: {
                        'Authorization': `Bearer ${tkns}`
                    }
                });

        return uploadResult;
    }
    catch (err) {        
        throw err;
    }
}