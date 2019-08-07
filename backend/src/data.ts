import dbCon from "./db";

export function retrieveData(care_recipient_id:   string = "",
                             event_type:          string = "",
                             date_from:           string = "",
                             date_to:             string = "") {
    return new Promise((resolve, reject) => {
        const query = buildQuery(care_recipient_id, event_type, date_from, date_to);
        runQuery(query).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

function buildQuery(care_recipient_id:   string = "",
                    event_type:          string = "",
                    date_from:           string = "",
                    date_to:             string = "") {
    let query = "SELECT payload FROM events"
    let conditions = 0;
    if (care_recipient_id) {
        query += ` WHERE care_recipient_id = "${care_recipient_id}"`;
        conditions++;
    }
    if (event_type) {
        query += (conditions == 0 ? " WHERE " : " AND ") + `event_type = "${event_type}"`;
        conditions++;
    }
    if (date_from) {
        query += (conditions == 0 ? " WHERE " : " AND ") + `timestamp >= "${date_from}"`;
        conditions++;
    }
    if (date_to){
        query += (conditions == 0 ? " WHERE " : " AND ") + `timestamp <= "${date_to}"`;
        conditions++;
    }
    return query + ";"
}

function runQuery(query: string): Promise<Object[]> {
    return new Promise((resolve, reject) => {
        dbCon.query(query, (err, res) => {
            if (err) reject(err);
            if (res == undefined) {
                resolve([]);
            } else {
                let objects = []
                for (const row of res) {
                    objects.push(JSON.parse(row.payload));
                }
                resolve(objects);
            }
        });
    });
}
