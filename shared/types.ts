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
        dependencies: string[];
        priority: 'Essential' | 'Important' | 'Desirable';
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
            requirements: Section;
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
