import { wrap } from "comlink"
import NProgress from "nprogress"
import vtkPolyData from "@kitware/vtk.js/Common/DataModel/PolyData"

export default async function stpReader(fileArrayBuffer, worker, fileName) {
  const polydata = vtkPolyData.newInstance()
  const timerContainer = document.getElementById("timeclock")
  let time = 0
  const timer = setInterval(() => {
    time += 0.1
    timerContainer.innerHTML = `计算耗时：${time.toFixed(2)}s`
  }, 100)
  try {
    NProgress.start()
    const proxy = wrap(worker);
    const json = await proxy.createMesh(fileArrayBuffer, fileName);
    const { pointValues, cellValues } = json
    polydata.getPoints().setData(pointValues, 3)
    polydata.getPolys().setData(cellValues)
    worker.terminate()
    NProgress.done()
    clearInterval(timer)
    return polydata
  } catch (error) {
    worker.terminate()
  }
}
