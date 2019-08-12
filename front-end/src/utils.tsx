// turn underscored lowercase strings into separate words, with first characters in uppercase
export const prettify = (input: string) => {
    let words = input.split('_');
    return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
};

// returns true if input string is valid Birdie Care UUID
export const isValidUUID = (uuid: string): boolean => {
    return new RegExp(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i).test(uuid);
};

// returns string in format MMM DD YYYY e.g. Apr 24 2019 from Birdie db timestamp
export const extractDate = (timestamp: string): string => {
    return new Date(timestamp).toString().split('(')[0].slice(4, 16);
};

// returns time in format HH:MM (24-hours) from Birdie db timestamp
export const extractTime = (timestamp: string): string => {
    return new Date(timestamp).toString().split('(')[0].slice(16, 21);
};