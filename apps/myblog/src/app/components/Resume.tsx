//import Experience from '../models/Experience';
//import Education from '../models/Education';
//import Project from '../models/Project';
//import ResumeModel from '../models/Resume';
import ResumeName from './ResumeName';
import Description from './Description';
import Experiences from './Experiences';
import Projects from './Projects';
import Educations from './Educations';
import Experience from '../models/Experience';
import Education from '../models/Education';
import Project from '../models/Project';
import ResumeModel from '../models/Resume';


function GetResume() {
    const description = "I'm a software engineer, living in Rabat, Morocco.";
    var experience = new Experience("société générale africa technologies & services",
      "http://africa-technologies-services.sgcib.com/",
      "Software Engineer",
      "Belong to Infra team",
      "04/02/2019",
      "Now");
    var education = new Education("Université Hassan II Mohammedia",
      "https://www.fstm.ac.ma/",
      "Software engineering",
      "Description",
      "04/09/2016",
      "06/06/2019");
    var project = new Project("Sudoku-SWAT",
      "#",
      "The purpose behind this project was to approach NP problems and try to implement solutions that have lower complexity. We choosed as a problem a sudoku grid generator, in the length 3x3, 6x6, 9x9 and 16x16.",
      "06/01/2016",
      "06/06/2016")
    const experiences = [experience, experience]
    const projects = [project, project]
    const educations = [education, education]
    return new ResumeModel("ELKAISSI SOUHAIL", description, projects, experiences, educations);
  }


function Resume() {
    const  resume  = GetResume();
    return (
        <div className="flex justify-center overflow-hidden rounded">
            <div className="w-screen min-h-screen box-content max-w-screen-lg shadow-lg px-6 py-4 m-2">
                <ResumeName completName={resume.completName} />
                <Description description={resume.description} />
                <Experiences experiences={resume.experiences} />
                <Projects projects={resume.projects} />
                <Educations educations={resume.educations} />
            </div>
        </div>
    )
}
export default Resume;