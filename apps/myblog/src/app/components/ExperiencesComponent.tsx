import { Experience } from "@souhailelk/myblog.domain";

function ExperiencesComponent(props: {experiences:Experience[]}) {
    let experiencesComponents: JSX.Element[] = []
    props.experiences.forEach(experience => {
        experiencesComponents.push(<div className="block px-4 py-2 font-sans text-left md:m-4">
            <div className="uppercase tracking-wide text-xs md:text-sm text-indigo-600 font-bold">{experience.jobTitle}</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{experience.startDate}</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">-</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{experience.endDate}</div>
            <div className="uppercase text-xs md:text-sm"><a href={experience.companyLink}>{experience.companyName}</a></div>
            <div className="text-xs md:text-lg m-2">{experience.description}</div>
        </div>)
    });
    return (
        <div className="block px-4 py-2 text-left">
            <div className="font-sans text-sm md:text-xl font-black">Experiences :</div>
            {experiencesComponents}
        </div>
    )
}
export default ExperiencesComponent;