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

export namespace SRS {

    export type Priority = 'Essential' | 'Important' | 'Desirable';

    export interface FieldSpec {
        id: number;
        name: string;
        description: string;
        type: string;
        required: boolean;
    }

    export interface Entity {
        name: string;
        fields: FieldSpec[];
        description?: string;
    }

    export interface Requirement {
        id: string;
        _key: string;
        title: string;
        text: string;
        color?: string;
        dependencies: (Requirement | null)[];
        priority: Priority;
        entities?: Entity[];
    }


    export interface Section {
        title: string;
        content: string;
        subsection?: Section[];
    }

    export interface Specification {
        sections: {
            introduction: Section;
            productOverview: Section;
            restrictions: Section;
            functionalRequirements: Section;
            nonFunctionalRequirements: Section;
            trackability: Section;
            modifications: Section;
            developmentStrategy: Section;
            completionCriteria: Section;
        };
        requirements: {
            functional: Requirement[];
            nonFunctional: Requirement[];
        };
    }
}
