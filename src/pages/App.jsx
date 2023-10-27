import { useState } from "react"
import "@kitware/vtk.js/Rendering/Profiles/Geometry"
import TimerClock from "../components/TimerClock"
import VtpViewer from "./VtpViewer"
import FileUpload from "./FileUpload"
import useReader from "../hooks/useReader"

function App() {
  const [file, setFile] = useState(null)
  const polydata = useReader({ file })

  return (
    <div className="app">
      <TimerClock />
      <VtpViewer polydata={polydata} />
      <FileUpload setFile={setFile} />
    </div>
  )
}

export default App
