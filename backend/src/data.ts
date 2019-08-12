import dbCon from "./db";

// TODO: Place initial db call that fetches all event types present, rather than hard-code.
const eventTypes = new Set([
    "fluid_intake_observation",
    "task_completed",
    "physical_health_observation",
    "visit_completed",
    "check_out",
    "mood_observation",
    "regular_medication_taken",
    "alert_raised",
    "no_medication_observation_received",
    "incontinence_pad_observation",
    "check_in",
    "general_observation",
    "regular_medication_not_taken",
    "food_intake_observation",
    "task_completion_reverted",
    "mental_health_observation",
    "medication_schedule_updated",
    "visit_cancelled",
    "regular_medication_maybe_taken",
    "medication_schedule_created",
    "alert_qualified",
    "task_schedule_created",
    "concern_raised",
    "regular_medication_partially_taken",
    "catheter_observation",
    "toilet_visit_recorded"
]);

const isValidUUID = (uuid: string): boolean => {
    return new RegExp(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i).test(uuid);
}

export function retrieveEventTypes(careRecipientID: string): Promise<String[]> {
    return new Promise((resolve, reject) => {
        if (!isValidUUID(careRecipientID)) reject('Invalid UUID');
        runQuery(`SELECT event_type FROM events WHERE care_recipient_id = ${dbCon.escape(careRecipientID)};`)
        .then(
            res => {
                let types = new Set<String>(); // create set of all types, return as Array
                for (const row of res) {
                    types.add(Object(row).event_type);
                }
                resolve(new Array(...types));
        })
        .catch(err => {
            reject(err);
        });
    });
}

export function retrieveData(careRecipientID:   string = "",
                             eventType:         string = "",
                             dateFrom:          string = "",
                             dateTo:            string = "") : Promise<Object[]> {
    return new Promise((resolve, reject) => {
        if (!isValidUUID(careRecipientID)) reject('Invalid UUID');
        const query = buildQuery(careRecipientID, eventType, dateFrom, dateTo);
        runQuery(query).then(res => {
            let objects = []; // parse Event payload strings into Objects and return as Array
            for (const row of res) {
                objects.push(JSON.parse(Object(row).payload));
            }
            resolve(objects);
        }).catch(err => {
            reject(err);
        });
    });
}

function buildQuery(careRecipientID:   string = "",
                    eventType:         string = "",
                    dateFrom:          string = "",
                    dateTo:            string = ""): string {
    let query = "SELECT payload FROM events";
    let conditions = 0;
    if (careRecipientID) {
        query += ` WHERE care_recipient_id = ${dbCon.escape(careRecipientID)}`;
        conditions++;
    }
    if (eventTypes.has(eventType)) {
        query += (conditions == 0 ? " WHERE " : " AND ") +
        `event_type = ${dbCon.escape(eventType)}`;
        conditions++;
    }
    if (dateFrom) {
        query += (conditions == 0 ? " WHERE " : " AND ") +
        `timestamp >= '${new Date(dateFrom).toISOString().slice(0, 10)}'`;
        conditions++;
    }
    if (dateTo){
        query += (conditions == 0 ? " WHERE " : " AND ") +
        `timestamp <= ${new Date(dateTo).toISOString().slice(0, 10)}}`;
        conditions++;
    }
    return query + " ORDER BY timestamp DESC;" // order query by date descending
}

function runQuery(query: string): Promise<Object[]> {
    return new Promise((resolve, reject) => {
        dbCon.query(query, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}
