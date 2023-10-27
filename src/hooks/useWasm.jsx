import { useState, useEffect } from "react"
import Visulization from "../WASM/Visualization"
import VisulizationWASM from "../WASM/Visualization.wasm?url"

export function useWasm() {
  const [state, setState] = useState(null)
  useEffect(() => {
    const Module = {
      locateFile: () => VisulizationWASM,
      onRuntimeInitialized: () => {}
    }

    Visulization(Module).then(async (module) => {
      setState(module)
    })
  }, [])
  return state
}
