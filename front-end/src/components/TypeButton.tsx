import * as React from 'react';
import { connect } from 'react-redux';

interface DSState {
    value: string;
}

interface DSProps {
    data?: Event[];
    types?: string[];
    dispatch?: any;
    value: string;
}

export class TypeButton extends React.Component<DSProps, DSState> {

    render() {
        return (
            <div>
                <input type="submit" value={this.props.value}/>
                <br />
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

export default connect(mapStateToProps)(TypeButton);