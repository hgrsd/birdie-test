import dbCon from "./db";

export function retrieveEventTypes(care_recipient_id: string) {
    return new Promise((resolve, reject) => {
        runQuery(`SELECT event_type FROM events WHERE care_recipient_id = ${dbCon.escape(care_recipient_id)};`)
        .then(
            res => {
                let types = new Set();
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

export function retrieveData(care_recipient_id:   string = "",
                             event_type:          string = "",
                             date_from:           string = "",
                             date_to:             string = "") {
    return new Promise((resolve, reject) => {
        const query = buildQuery(care_recipient_id, event_type, date_from, date_to);
        runQuery(query).then(res => {
            let objects = [];
            for (const row of res) {
                objects.push(JSON.parse(Object(row).payload));
            }
            resolve(objects);
        }).catch(err => {
            reject(err);
        });
    });
}

function buildQuery(care_recipient_id:   string = "",
                    event_type:          string = "",
                    date_from:           string = "",
                    date_to:             string = "") {
    let query = "SELECT payload FROM events";
    let conditions = 0;
    if (care_recipient_id) {
        query += ` WHERE care_recipient_id = ${dbCon.escape(care_recipient_id)}`;
        conditions++;
    }
    if (event_type) {
        query += (conditions == 0 ? " WHERE " : " AND ") + `event_type = ${dbCon.escape(event_type)}`;
        conditions++;
    }
    if (date_from) {
        query += (conditions == 0 ? " WHERE " : " AND ") + `timestamp >= ${dbCon.escape(date_from)}`;
        conditions++;
    }
    if (date_to){
        query += (conditions == 0 ? " WHERE " : " AND ") + `timestamp <= ${dbCon.escape(date_to)}`;
        conditions++;
    }
    return query + ";"
}

function runQuery(query: string): Promise<Object[]> {
    console.log(query);
    return new Promise((resolve, reject) => {
        dbCon.query(query, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}
