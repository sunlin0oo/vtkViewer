export function getColorByOptions(source) {
  try {
    if (!source) {
      throw "source is not defiend"
    }
    const colorByOptions = [{ value: ":", label: "Solid color" }].concat(
      source
        .getPointData()
        .getArrays()
        .map((a) => ({
          label: `(p) ${a.getName()}`,
          value: `PointData:${a.getName()}`
        })),
      source
        .getCellData()
        .getArrays()
        .map((a) => ({
          label: `(c) ${a.getName()}`,
          value: `CellData:${a.getName()}`
        }))
    )
    return colorByOptions
  } catch (error) {
    console.error(error)
    return []
  }
}
