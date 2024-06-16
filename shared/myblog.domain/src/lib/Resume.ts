import {Project} from './Project'
import {Experience} from './Experience'
import {Education} from './Education'

export class Resume {
    completName: string;
    description: string;
    projects: Project[];
    experiences: Experience[];
    educations: Education[];

    constructor(completName:string, description:string, projects:Project[], experiences:Experience[], educations:Education[]) {
        this.completName = completName;
        this.description = description;
        this.projects = projects;
        this.experiences = experiences;
        this.educations = educations;
    }
}