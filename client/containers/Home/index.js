/* eslint-disable */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import {
  getNoteGroups,
  editNoteGroup,
  deleteNoteGroup,
  addNoteGroup,
} from './actions';

import {
  selectNoteGroups,
  selectNoteGroupModel,
  selectGetNoteGroupStatus,
  selectAddNoteGroupStatus,
  selectEditNoteGroupStatus,
  selectDeleteNoteGroupStatus,
} from './selectors';

import Home from '../../components/Home';

import Loader from '../../components/Loader';
export class HomeContainer extends React.Component {

  componentWillMount() {
    this.props.onGetNoteGroups();
  }

  render() {
    const { getNoteGroupsStatus, addNoteGroupStatus, editNoteGroupStatus, deleteNoteGroupStatus } = this.props;
    const getNoteGroupLoading = getNoteGroupsStatus.get('loading');
    const addNoteGroupAdding = addNoteGroupStatus.get('adding');
    const editNoteGroupEditing = editNoteGroupStatus.get('editing');
    const deleteNoteGroupDeleting = deleteNoteGroupStatus.get('deleting');
    if(getNoteGroupLoading || addNoteGroupAdding || editNoteGroupEditing || deleteNoteGroupDeleting) return <Loader />;
    return (
      <div>
      <Home
        groups={this.props.noteGroups}

        addGroup={this.props.onAddNoteGroup}
        editGroup={this.props.onEditNoteGroup}
        deleteGroup={this.props.onDeleteNoteGroup}
        changeRoute={this.props.onChangeRoute}
      />
      </div>
    );
  }
}

HomeContainer.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    onGetNoteGroups: () => dispatch(getNoteGroups()),
    onAddNoteGroup: (group) => dispatch(addNoteGroup(group)),
    onEditNoteGroup: (group, slug, index) => dispatch(editNoteGroup(group, slug, index)),
    onDeleteNoteGroup: (slug, index) => dispatch(deleteNoteGroup(slug, index)),
    onChangeRoute: (route) => dispatch(browserHistory.push(route)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  noteGroups: selectNoteGroups(),
  noteGroupModel: selectNoteGroupModel(),
  getNoteGroupsStatus: selectGetNoteGroupStatus(),
  addNoteGroupStatus: selectAddNoteGroupStatus(),
  editNoteGroupStatus: selectEditNoteGroupStatus(),
  deleteNoteGroupStatus: selectDeleteNoteGroupStatus(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
