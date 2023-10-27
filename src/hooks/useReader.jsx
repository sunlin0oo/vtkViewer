import { useEffect, useState } from "react"
import { message } from "antd"
import { useWasm } from "../hooks/useWasm"
import { getFileSuffix } from "../utils/fileProcess"
import vtkReader from "../readers/vtkReader"
import stlReader from "../readers/stlReader"
import stpReader from "../readers/stpReader"
import vtpReader from "../readers/vtpReader"

export default function useReader({ file }) {
  const Module = useWasm()
  const [polyData, setPoloData] = useState(null)

  useEffect(() => {
    if (!file) {
      return () => {}
    }
    let fileArrayBuffer
    const suffix = getFileSuffix(file?.name)
    const arrayBufferReader = new FileReader()
    arrayBufferReader.readAsArrayBuffer(file)
    arrayBufferReader.onload = (data) => {
      fileArrayBuffer = data.target.result
      build()
    }
    const worker = new Worker(
      new URL("../workers/worker.js", import.meta.url),
      {
        type: "module"
      }
    )
    const build = async () => {
      switch (suffix) {
        case "vtk":
        case "VTK":
          setPoloData(vtkReader(fileArrayBuffer, Module))
          break
        case "vtp":
        case "VTP":
          setPoloData(vtpReader(fileArrayBuffer))
          break
        case "stl":
        case "STL":
          setPoloData(stlReader(fileArrayBuffer))
          break
        case "stp":
        case "STP":
        case "step":
        case "STEP":
          setPoloData(await stpReader(fileArrayBuffer, worker, file?.name))
          break
        default:
          message.error("不支持的文件格式")
          break
      }
    }

    return () => {
      worker.terminate()
    }
  }, [Module, file])

  return polyData
}
