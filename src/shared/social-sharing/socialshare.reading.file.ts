import { File } from "@ionic-native/file";

import { SocialSharing } from "@ionic-native/social-sharing/";
import { ITicketsDevolutionState } from "../../providers/tickets-devolution/tickets-devolution.types";

export const shareFileViaWhatsApp = async (
  state: ITicketsDevolutionState,
  agente: string,
  fileName: string,
  fileContentStr: string
): Promise<string> => {
  try {
    const fileEntry = await File.createFile(
      File.dataDirectory,
      fileName,
      false
    );
    const blob = new Blob([fileContentStr], { type: "text/plain" });
    await File.writeFile(File.dataDirectory, fileName, blob, {
      replace: false,
      append: true,
    });

    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: `Archivo devoluciones Microcupos
Agente: ${agente}
Loteria: ${state.codigoLoteria}
Sorteo: ${state.sorteo}`, // not supported on some apps (Facebook, Instagram)
      subject: "Devolución Microcupos", // fi. for email
      files: [fileEntry.nativeURL], // an array of filenames either locally or remotely
      url: "",
      chooserTitle: "Seleccione una aplicación", // Android only, you can override the default share sheet title
    };

    await SocialSharing.shareWithOptions(options);

    return "ok";
  } catch (err) {
    setTimeout(() => {
      alert(JSON.stringify(err));
    }, 1700);
    throw err;
  }
};
