import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '@App/store/actions';
import TypeButton from './TypeButton';

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
    currentType: string;
}

export class TypeSelector extends React.Component<DSProps, DSState> {
    constructor(props: DSProps) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e: any) {
        this.props.dispatch(actions.updateCareRecipientID(this.state.value));
        this.props.dispatch(actions.requestTypes(this.state.value));
        e.preventDefault();
    }

    render() {
        const types = this.props.types ? this.props.types.map(
            type => <TypeButton value={type} key={type}/>
        ) : [];
        if (types.length > 0) {
            return (
                <div className="four columns">
                    {<TypeButton value="all" key="all" />}
                    {types}
                </div>
            );
        } else {
            return ('');
        }
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.eventsState.events,
      types: state.eventsState.types,
      error: state.eventsState.error,
      errorMessage: state.eventsState.errorMessage,
      careRecipientID: state.eventsState.careRecipientID,
      currentType: state.eventsState.currentType
    };
};

export default connect(mapStateToProps)(TypeSelector);