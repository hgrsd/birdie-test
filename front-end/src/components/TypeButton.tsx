import * as React from 'react';
import { connect } from 'react-redux';
import { requestEventsByType, requestAllEvents } from '@App/store/actions';

interface DSState {
    value: string;
}

interface DSProps {
    events?: Event[];
    types?: string[];
    careRecipientID: string;
    dispatch?: any;
    value: string;
    currentType: string;
}

export class TypeButton extends React.Component<DSProps, DSState> {
    constructor(props: DSProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.currentType === this.props.value) {
            return;
        }
        if (this.props.value === 'all') {
            this.props.dispatch(requestAllEvents(this.props.careRecipientID));
        } else {
            this.props.dispatch(requestEventsByType(this.props.careRecipientID, this.props.value));
        }
    }

    prettify(input: string) {
        let words = input.split('_');
        return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
    }

    render() {
        return (
            <div>
                <button
                    className={this.props.value === this.props.currentType ? 'button-primary' : 'button'}
                    value={this.props.value}
                    onClick={this.handleClick}
                >
                    {this.prettify(this.props.value)}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.eventsState.events,
      types: state.eventsState.types,
      careRecipientID: state.eventsState.careRecipientID,
      currentType: state.eventsState.currentType
    };
};

export default connect(mapStateToProps)(TypeButton);