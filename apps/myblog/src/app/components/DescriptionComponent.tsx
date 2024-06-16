function DescriptionComponent(props: {description:string}) {
    return (
        <div className="block px-4 py-2 text-left">
            <div className="font-sans text-sm md:text-xl font-black">Description :</div>
            <div className="block px-4 py-2 font-sans test-base text-xs md:text-lg m-2 text-left">{props.description}</div>
        </div>
    )
}
export default DescriptionComponent;