export interface CareEvent {
    id: string;
    fluid?: string;
    observed?: boolean;
    visit_id: string;
    timestamp: string;
    event_type: string;
    caregiver_id: string;
    care_recipient_id: string;
    task_instance_id?: string;
    task_schedule_id?: string;
    task_definition_id?: string;
    task_schedule_note?: string;
    task_definition_description?: string;
    note?: string;
    mood?: string;
    medication_type?: string;
    alert_id?: string;
    observation_event_id?: string;
    expected_dose_timestamp?: string;
    navigation?: Object;
    screenProps?: Object;
    observations?: Object[];
    pad_condition?: string;
    media?: Object[];
    medication_failure_reason?: string;
    meal?: string;
    type?: string;
    rrule?: string;
    user_id?: string;
    dose_size?: string;
    medical_product_id?: string;
    medication_schedule_id?: string;
    alert_severity?: string;
    severity?: string;
    volume_ml?: number;
    visit_type?: string;
    visit_count?: number;
}

export interface Action {
    type: string;
    payload?: any;
}

export interface RootState {
    events: CareEvent[];
    error: boolean;
    errorMessage: string;
    types: string[];
    currentType: string;
    careRecipientID: string;
}