/**
 * Displays the result of questionnaire.
 * 
 * Contains the daily value result of the user.
 */


import QuestionnaireResult from '../../containers/QuestionnaireResult/QuestionnaireResult'
import { connect } from 'react-redux'

const EntryUserInputResult = (props) => {
  return (
    <>
      <QuestionnaireResult userInfo={props.userInfo}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(EntryUserInputResult)