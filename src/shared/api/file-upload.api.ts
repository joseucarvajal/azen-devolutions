import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadResult } from '@ionic-native/file-transfer';

import { trimLasCharacter } from '../../shared/utils/zutils';

export const uploadFile = async (apiURL: string, fileName: string, fileContentStr: string, tkns: string): Promise<FileUploadResult> => {
    try {        
        
        const fileEntry = await File.createFile(File.dataDirectory, fileName, false);
        const blob = new Blob([fileContentStr], { type: 'text/plain' });        
        await File.writeFile(File.dataDirectory, fileName, blob, { replace: false, append: true });

        const fileTransferObj = FileTransfer.create();
        const uploadResult = await fileTransferObj
            .upload(fileEntry.nativeURL,
                `${trimLasCharacter(apiURL, '/')}/api/transferfile/1`,
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
        setTimeout(() => {        
            alert('ERROR' + '\n' + JSON.stringify(err));
          }, 1700);        
        throw err;
    }
}