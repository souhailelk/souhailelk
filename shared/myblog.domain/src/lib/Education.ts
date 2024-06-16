export class Education {
    schoolName: string;
    schoolLink: string;
    degree: string;
    description: string;
    startDate: string;
    endDate: string;
    constructor(schoolName:string, schoolLink:string, degree:string, description:string, startDate:string, endDate:string) {
        this.schoolName = schoolName;
        this.schoolLink = schoolLink;
        this.degree = degree;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}