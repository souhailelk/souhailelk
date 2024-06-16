import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";

class Resume {
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
export default Resume;