import React, { useEffect } from "react"
import NavFrame from "../../components/templates/NavFrame"
import TVChartNative from "../../components/molecules/TVChartNative"

export default function Cardano(props) {
  return (
    <NavFrame page={"Chart"}>
      <TVChartNative />
    </NavFrame>
  )
}
