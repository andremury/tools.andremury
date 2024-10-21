export interface Table {
    name: string;
    fields: A4Field[];
}

export interface A4Field {
    name: string;
    reps?: number;
    sets?: number;
    weight?: number;
}
