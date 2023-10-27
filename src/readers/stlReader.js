import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader"

export default function stlReader(fileArrayBuffer) {
  if (!fileArrayBuffer) return
  const reader = vtkSTLReader.newInstance()
  reader.parseAsArrayBuffer(fileArrayBuffer)
  return reader.getOutputData(0)
}
