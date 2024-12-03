import fs from 'fs'
import path from 'path'

export const emptyFolder = async (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    return
  }

  fs.readdirSync(folderPath).forEach((file) => {
    const curPath = path.join(folderPath, file)
    if (fs.lstatSync(curPath).isDirectory()) {
      emptyFolder(curPath)
      fs.rmdirSync(curPath)
    } else {
      fs.unlinkSync(curPath)
    }
  })

  fs.rmdirSync(folderPath)
}
