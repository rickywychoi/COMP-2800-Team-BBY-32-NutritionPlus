// entryuserinput/result.js
import EntryResult from '../../containers/EntryResult/EntryResult'
import { connect } from 'react-redux'

const EntryUserInputResult = (props) => {
  return (
    <>
      <EntryResult eer={props.userEER}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userEER: state.userEER
  }
}

export default connect(mapStateToProps)(EntryUserInputResult)