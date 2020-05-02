// entryuserinput/result.js
import EntryResult from '../../containers/EntryResult/EntryResult'
import { connect } from 'react-redux'

const EntryUserInputResult = (props) => {
  return (
    <>
      <EntryResult userInfo={props.userInfo}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(EntryUserInputResult)