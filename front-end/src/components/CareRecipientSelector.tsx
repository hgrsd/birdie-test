import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '@App/store/actions';

interface DSState {
    value: string;
}

interface DSProps {
    events: Event[];
    error: boolean;
    errorMessage: string;
    types: string[];
    careRecipientID: string;
    dispatch: any;
}

export class CareRecipientSelector extends React.Component<DSProps, DSState> {
    constructor(props: DSProps) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
    }

    handleChange(e: any) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e: any) {
        if (!this.isValidUUID(this.state.value)) {
            this.props.dispatch(actions.requestFailed('Invalid UUID.'));
            return;
        }
        this.props.dispatch(actions.updateCareRecipientID(this.state.value));
        this.props.dispatch(actions.requestTypes(this.state.value));
    }

    handleChangeUser() {
        this.props.dispatch(actions.clearAllState());
    }

    isValidUUID = (uuid: string): boolean => {
        return new RegExp(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i).test(uuid);
    }

    render() {
        if (this.props.careRecipientID === '') {
            return (
                <div>
                    <h5>Welcome. Please enter a Care Recipient ID to get started.</h5>
                    <input
                        type="text"
                        name="care_recipient_id"
                        value={this.state.value}
                        size={36}
                        onChange={this.handleChange}
                    />
                    <button className="button-primary" value="Go" onClick={this.handleSubmit}>
                        Go
                    </button>
                    {this.props.error === true ? <h6>Error: {this.props.errorMessage}</h6> : ''}
                </div>
            );
        } else {
            return(
                <div>
                    <h5>Viewing data for {this.props.careRecipientID}.</h5>
                    <button className="button" value="Change User" onClick={this.handleChangeUser}>Change User</button>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.eventsState.events,
      types: state.eventsState.types,
      error: state.eventsState.error,
      errorMessage: state.eventsState.errorMessage,
      careRecipientID: state.eventsState.careRecipientID
    };
};

export default connect(mapStateToProps)(CareRecipientSelector);