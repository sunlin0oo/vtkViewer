export default function FileUpload({ setFile }) {
  const fileChange = (data) => {
    const file = data.target.files[0]
    setFile(file)
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        right: "50px",
        background: "white",
        padding: "12px"
      }}
    >
      <input
        type="file"
        accept=".vtk,.vtp,.step,.STEP,.stp,.STP,.stl,.STL"
        onChange={fileChange}
      />
    </div>
  )
}
