import Project from "../models/Project";

function Projects(props: {projects:Project[]}) {
    let projectsComponents:JSX.Element[] = []
    props.projects.forEach(project => {
        projectsComponents.push(<div className="block px-4 py-2 font-sans text-left md:m-4">
            <div className="uppercase tracking-wide text-xs md:text-sm text-indigo-600 font-bold"><a href={project.projectLink}>{project.projectName}</a></div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{project.startDate}</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">-</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{project.endDate}</div>
            <div className="text-xs md:text-lg m-2">{project.description}</div>
        </div>)
    });

    return (
        <div className="block px-4 py-2 text-left">
            <div className="font-sans text-sm md:text-xl font-black">Projects :</div>
            {projectsComponents}
        </div>
    )
}
export default Projects;