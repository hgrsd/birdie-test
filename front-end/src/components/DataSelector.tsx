import * as React from 'react';
import { connect } from 'react-redux';
import { CareEvent } from '@App/store/types';

import AllEventView from '@App/components/eventviews/AllEventView';
import EventView from '@App/components/eventviews/EventView';
import MoodView from '@App/components/eventviews/MoodView';
import TaskView from '@App/components/eventviews/TaskView';
import FluidIntakeView from '@App/components/eventviews/FluidIntakeView';
import RegularMedsTakenView from '@App/components/eventviews/RegularMedsTakenView';
import NoMedsObservationReceivedView from '@App/components/eventviews/NoMedsObservationReceivedView';
import IncontinencePadObservationView from '@App/components/eventviews/IncontinencePadObservationView';
import FoodIntakeView from '@App/components/eventviews/FoodIntakeView';

interface DSProps {
    events: CareEvent[];
    types: string[];
    currentType: string;
    careRecipientID: string;
    dispatch?: any;
}

export class DataSelector extends React.Component<DSProps, {}> {

    render() {
        if (this.props.events.length !== 0) {
            var displayEvents;
            switch (this.props.currentType) {
                case 'mood_observation':
                    displayEvents = <MoodView events={this.props.events}/>;
                    break;

                case 'all':
                    displayEvents = <AllEventView events={this.props.events}/>;
                    break;

                case 'task_completed':
                    displayEvents = <TaskView events={this.props.events}/>;
                    break;

                case 'task_completion_reverted':
                    displayEvents = <TaskView events={this.props.events}/>;
                    break;

                case 'fluid_intake_observation':
                    displayEvents = <FluidIntakeView events={this.props.events}/>;
                    break;

                case 'regular_medication_taken':
                    displayEvents = <RegularMedsTakenView events={this.props.events}/>;
                    break;

                case 'no_medication_observation_received':
                    displayEvents = <NoMedsObservationReceivedView events={this.props.events}/>;
                    break;

                case 'incontinence_pad_observation':
                    displayEvents = <IncontinencePadObservationView events={this.props.events}/>;
                    break;

                case 'food_intake_observation':
                    displayEvents = <FoodIntakeView events={this.props.events}/>;
                    break;

                default:
                    displayEvents = <EventView events={this.props.events}/>;
            }
            return (
                <div className="eight columns">
                    <div className="row scrolling">
                        {displayEvents}
                    </div>
                    <div className="row">
                        <br />
                        <h6>
                            If you have any concerns, please <a href="mailto:birdie@birdie.care">contact us</a>.
                        </h6>
                    </div>
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

export default connect(mapStateToProps)(DataSelector);