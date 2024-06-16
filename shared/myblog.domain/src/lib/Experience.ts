export class Experience {
    companyName: string;
    companyLink: string;
    jobTitle: string;
    description: string;
    startDate: string;
    endDate: string;
    constructor(companyName:string, companyLink:string, jobTitle:string, description:string, startDate:string, endDate:string) {
        this.companyName = companyName;
        this.companyLink = companyLink;
        this.jobTitle = jobTitle;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}