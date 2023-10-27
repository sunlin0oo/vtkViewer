import { expose } from "comlink"
import opencascadeJs from "./ocat/wasm/occt.wasm.js"
import opencascadeWasm from "./ocat/wasm/occt.wasm.wasm?url"
import { setOC } from "./ocat/index"
import { loadFileAndGetInfo } from "./ocat/library"
import { BuildPolyData } from "./unit/polyDataBuild"

let loaded = false
const init = async () => {
  if (loaded) return Promise.resolve(true)
  const OC = await opencascadeJs({
    locateFile: () => opencascadeWasm
  })
  loaded = true
  setOC(OC)
  return true
}

async function createMesh(fileArrayBuffer, fileName) {
  try {
    await init()
    const polyDataJson = await loadFileAndGetInfo(fileArrayBuffer, fileName)
    const jsonParseResult = BuildPolyData(polyDataJson)
    return {
      polyDataJson,
      ...jsonParseResult
    }
  } catch (error) {
    console.log("error", error)
    return {}
  }
}

expose({ createMesh })
