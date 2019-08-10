import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from '@App/store/actions';
import TypeButton from './TypeButton';

interface DSState {
    value: string;
}

interface DSProps {
    data?: Event[];
    types?: string[];
    dispatch?: any;
}

export class DataSelector extends React.Component<DSProps, DSState> {
    constructor(props: DSProps) {
        super(props);
        this.state = {
            value: 'Care Recipient UUID'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: any) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e: any) {
        // tslint:disable-next-line:no-console
        console.log(this);
        this.props.dispatch(actions.requestTypes(this.state.value));
        e.preventDefault();
    }

    render() {
        const types = this.props.types ? this.props.types.map(
            type => <TypeButton value={type} key={type}/>
        ) : [];
        return (
            <div>
                <p>
                    <input type="text" name="care_recipient_id" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Request" onClick={this.handleSubmit} />
                </p>
                <p>
                    {types}
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.eventsState.events,
      types: state.eventsState.types
    };
};

export default connect(mapStateToProps)(DataSelector);