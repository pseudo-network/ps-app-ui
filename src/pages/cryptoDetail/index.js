import React from 'react'

import { connect } from 'react-redux'

import {
  TextField
} from '@material-ui/core'

import NavFrame from '../../components/organisms/NavFrame/NavFrame' // The top navigation bar and side navigation panel
import TVChartWithHeader from '../../components/organisms/TVChartWithHeader/TVChartWithHeader'
import LiveViewContainer from '../../components/molecules/LiveViewContainer'

const CryptoDetail = props => {
  const [currentChart, setChart] = React.useState(
    'PancakeSwap Token:CAKE:0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
  )
  const onFieldChange = event => {
    console.log('event.target.value')
    console.log(event.target.value)
    setChart(event.target.value)
  }
  return (
    <NavFrame page={'CryptoDetail'}>
      <TextField
        id="testjazz"
        label="Chart"
        type="text"
        fullWidth
        my={2}
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        onChange={onFieldChange}
        name="Chart"
      />
      {/* <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      /> */}
      <TVChartWithHeader symbol={currentChart} />
      <br />
      <LiveViewContainer />
    </NavFrame>
  )
}
// Component Properties
CryptoDetail.propTypes = {}

// Component State
function CryptoDetailState () {
  return {}
}
export default connect(CryptoDetailState)(CryptoDetail)
