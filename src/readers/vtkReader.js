import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader"
import NProgress from "nprogress"

export default function vtkReader(fileArrayBuffer, Module) {
  if (!fileArrayBuffer) return
  NProgress.start()
  const fileData = new Uint8Array(fileArrayBuffer)
  const stream = Module.FS.open("result.vtk", "w+")
  Module.FS.write(stream, fileData, 0, fileData.length, 0)
  Module.FS.close(stream)
  const vtkReader = new Module.vtkGenericDataObjectReader()
  vtkReader.SetFileName("result.vtk")
  vtkReader.Update()
  let output
  if (vtkReader.IsFilePolyData()) {
    output = vtkReader.GetPolyDataOutput()
  }
  if (vtkReader.IsFileUnstructuredGrid()) {
    output = vtkReader.GetUnstructuredGridOutput()
  }
  if (vtkReader.IsFileStructuredGrid()) {
    output = vtkReader.GetStructuredGridOutput()
  }
  Module.FS.unlink("/result.vtk")
  const geometryFilter = new Module.vtkGeometryFilter()
  geometryFilter.SetInputData(output)
  geometryFilter.Update()
  const cxxPolydata = geometryFilter.GetOutput()
  const vtpWriter = new Module.vtkXMLPolyDataWriter()
  vtpWriter.SetWriteToOutputString(true)
  vtpWriter.SetInputData(cxxPolydata)
  vtpWriter.Write()
  const str = vtpWriter.GetOutputString()
  const originPolydataArrayBuffer = new TextEncoder().encode(str)
  const vtpReader = vtkXMLPolyDataReader.newInstance()
  vtpReader.parseAsArrayBuffer(originPolydataArrayBuffer)
  NProgress.done()
  return vtpReader.getOutputData(0)
}
