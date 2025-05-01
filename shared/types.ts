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

export interface ChosenOption<T = any> {
  label: string;
  key: string;
  value: T;
  disabled?: boolean;
}

export namespace SRS {
  export type Priority = 'Essential' | 'Important' | 'Desirable';

  export type SavedDocsDict = Record<number, Specification>;

  export interface FieldSpec {
    id: number;
    name: string;
    description: string;
    type: string;
    required: boolean;
  }

  export interface Entity {
    name: string;
    description?: string;
    fields: FieldSpec[];
  }

  export interface ShortRequirement {
    id: string;
    _key: string;
    title: string;
    color?: string;
  }

  export interface Dependency extends ShortRequirement {
    relatedRequirements: ShortRequirement[];
  }

  export interface Requirement extends Dependency {
    done?: boolean;
    group?: string;
    actors?: string;
    text: string;
    dependencies: (Dependency | null)[];
    priority: Priority;
    entities: Entity[];
  }

  export interface Section {
    title: string;
    content: string;
    subsection?: Section[];
    invisible?: boolean;
  }

  export interface Audit {
    date: Date;
    version: number;
    author: string;
    description: string;
  }

  export interface Specification {
    id: number;
    name: string;
    subtitle?: string;
    version: number;
    audits: Audit[];
    revision: Audit[];
    sections: {
      introduction: Section;
      productOverview: Section;
      constraints: Section;
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
