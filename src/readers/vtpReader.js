import vtkXMLPolyDataReader from "@kitware/vtk.js/IO/XML/XMLPolyDataReader"

export default function vtpReader(fileArrayBuffer) {
  const vtpReader = vtkXMLPolyDataReader.newInstance()
  vtpReader.parseAsArrayBuffer(fileArrayBuffer)
  return vtpReader.getOutputData(0)
}
