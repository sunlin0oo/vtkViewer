export function getFileSuffix(filename) {
  try {
    if (!filename) throw "The file name cannot be empty"
    return filename.split(".").pop()
  } catch (error) {
    console.error(error)
  }
}
