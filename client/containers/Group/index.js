/* eslint-disable */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  getNotes,
  editNote,
  deleteNote,
  addNote,
} from './actions';

import {
  selectNotes,
  selectNoteModel,
  selectGetNotesStatus,
  selectAddNoteStatus,
  selectEditNoteStatus,
  selectDeleteNoteStatus,
} from './selectors';

import Group from '../../components/Group';
import Loader from '../../components/Loader';

export class Container extends React.Component {

  componentWillMount() {
    const { groupSlug } = this.props.params;
    this.props.onGetNotes(groupSlug);
  }

  render() {
    const { getNotesStatus, addNoteStatus, editNoteStatus, deleteNoteStatus } = this.props;
    const getNotesLoading = getNotesStatus.get('loading');
    const addNoteAdding = addNoteStatus.get('adding');
    const editNoteEditing = editNoteStatus.get('editing');
    const deleteNoteDeleting = deleteNoteStatus.get('deleting');
    if(getNotesLoading || addNoteAdding || editNoteEditing || deleteNoteDeleting) return <Loader />;

    return (
      <div>
      <Group
        notes={this.props.notes}
        groupSlug={this.props.params.groupSlug}
        groupId={this.props.params.groupId}
        addNoteStatus={this.props.addNoteStatus}

        addNote={this.props.onAddNote}
        editNote={this.props.onEditNote}
        deleteNote={this.props.onDeleteNote}
      />
      </div>
    );
  }
}

Container.propTypes = {

};

function mapDispatchToProps(dispatch) {
  return {
    onGetNotes: (slug) => dispatch(getNotes(slug)),
    onAddNote: (note, id) => dispatch(addNote(note, id)),
    onEditNote: (note, slug, index) => dispatch(editNote(note, slug, index)),
    onDeleteNote: (slug, index) => dispatch(deleteNote(slug, index)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  notes: selectNotes(),
  noteModel: selectNoteModel(),
  getNotesStatus: selectGetNotesStatus(),
  addNoteStatus: selectAddNoteStatus(),
  editNoteStatus: selectEditNoteStatus(),
  deleteNoteStatus: selectDeleteNoteStatus(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Container);
