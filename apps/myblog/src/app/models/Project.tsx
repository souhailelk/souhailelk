class Project {
    projectName: string;
    projectLink: string;
    description: string;
    startDate: string;
    endDate: string;
    constructor(projectName:string, projectLink:string, description:string, startDate:string, endDate:string) {
        this.projectName = projectName;
        this.projectLink = projectLink;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
export default Project;