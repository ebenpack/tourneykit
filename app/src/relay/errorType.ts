interface Location {
    line: number;
    column: number;
}

export interface ErrorMessage {
    message: string;
    locations: Location[];
}

export interface ErrorType {
    errors: ErrorMessage[];
}
