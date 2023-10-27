import { useRef, useEffect } from "react"
import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow"
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor"
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper"
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData"
import vtkFPSMonitor from "@kitware/vtk.js/Interaction/UI/FPSMonitor"

export default function VtpViewer({ polydata }) {
  const vtkContainerRef = useRef(null)
  const context = useRef(null)
  useEffect(() => {
    if (!context.current) {
      const polyData = polydata ? polydata : vtkPolyData.newInstance()
      const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
        rootContainer: vtkContainerRef.current,
        background: [0, 0, 0]
      })
      const actor = vtkActor.newInstance()
      const mapper = vtkMapper.newInstance({
        scalarVisibility: true,
        interpolateScalarsBeforeMapping: false,
        useLookupTableScalarRange: true
      })
      mapper.setInputData(polyData)
      actor.setMapper(mapper)
      const renderer = fullScreenRenderer.getRenderer()
      const renderWindow = fullScreenRenderer.getRenderWindow()
      const fpsMonitor = vtkFPSMonitor.newInstance()
      const fpsElm = fpsMonitor.getFpsMonitorContainer()
      fpsElm.style.position = "absolute"
      fpsElm.style.left = "10px"
      fpsElm.style.top = "10px"
      fpsElm.style.background = "rgba(255,255,255,0.5)"
      fpsElm.style.borderRadius = "5px"

      fpsMonitor.setContainer(document.querySelector(".app"))
      fpsMonitor.setRenderWindow(renderWindow)

      fullScreenRenderer.setResizeCallback(fpsMonitor.update)
      renderer.addActor(actor)
      renderer.resetCamera()
      renderWindow.render()
      fpsMonitor.update()
      context.current = {
        fullScreenRenderer,
        renderWindow,
        renderer,
        actor,
        mapper,
        fpsMonitor
      }
    }
    return () => {
      if (context.current) {
        const { actor, mapper, fpsMonitor } = context.current
        actor.delete()
        mapper.delete()
        fpsMonitor.delete()
        context.current = null
      }
    }
  }, [polydata])

  return (
    <div>
      <div ref={vtkContainerRef} />
    </div>
  )
}
