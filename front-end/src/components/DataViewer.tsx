import * as React from 'react';
import { connect } from 'react-redux';
import { CareEvent } from '@App/store/types';
import EventView from '@App/components/EventView';
import MoodView from '@App/components/MoodView';

interface DSProps {
    events: CareEvent[];
    types: string[];
    currentType: string;
    careRecipientID: string;
    dispatch?: any;
}

export class DataViewer extends React.Component<DSProps, {}> {

    render() {
        if (this.props.events.length !== 0) {
            var displayEvents;
            switch (this.props.currentType) {
                case 'mood_observation':
                    displayEvents = <MoodView events={this.props.events}/>;
                    break;

                default:
                    displayEvents = <EventView events={this.props.events}/>;
            }
            return (
                <div className="eight columns">
                    <b>Start date: </b>
                    <input
                        type="text"
                        name="startDate"
                        value={this.props.events[this.props.events.length - 1].timestamp.slice(0, 10)}
                    />
                    <b>End date: </b>
                    <input
                        type="text"
                        name="endDate"
                        value={this.props.events[0].timestamp.slice(0, 10)}
                    />
                    {displayEvents}
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
      events: state.eventsState.events,
      types: state.eventsState.types,
      currentType: state.eventsState.currentType,
      careRecipientID: state.eventsState.careRecipientID
    };
};

export default connect(mapStateToProps)(DataViewer);