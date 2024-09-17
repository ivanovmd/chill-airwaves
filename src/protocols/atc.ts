import { app } from "electron"
import path from "path"
import fs from "fs"


const ATC_PROTOCOL = 'atc'


type ElectronProtocolHandler = (request: GlobalRequest) => string | Promise<string>


export const atcProtocolHandler: ElectronProtocolHandler = async (request: GlobalRequest) => {
  const url = request.url.substr(ATC_PROTOCOL.length + 3)
  const cachePath = app.getPath('downloads')
  const filePath = path.join(cachePath, url)
  const existingFilePath = await fs.promises.access(filePath)

  return 'test'
}