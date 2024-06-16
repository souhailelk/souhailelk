import { Education } from "@souhailelk/myblog.domain";

function EducationsComponent(props: {educations:Education[]}) {
    let educationsComponents:JSX.Element[] = []
    props.educations.forEach(education => {
        educationsComponents.push(<div className="block px-4 py-2 font-sans text-left md:m-4">
            <div className="uppercase tracking-wide text-xs md:text-sm text-indigo-600 font-bold">{education.degree}</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{education.startDate}</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">-</div>
            <div className="inline-block text-center text-xs md:text-sm md:m-1">{education.endDate}</div>
            <div className="uppercase text-xs md:text-sm"><a href={education.schoolLink}>{education.schoolName}</a></div>
        </div>)
    });

    return (
        <div className="block px-4 py-2 font-sans text-sm text-left">
            <div className="font-sans text-sm md:text-xl font-black">Education :</div>
            {educationsComponents}
        </div>
    )
}
export default EducationsComponent;