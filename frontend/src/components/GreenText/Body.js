import SlateEditor from "../SlateEditor";

const Body = ({ imgData }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex justify-center md:justify-start w-full text-center flex-col md:w-1/4 p-2 border-r border-[#d9bfb7]">
                <img className="m-auto md:m-0 rounded-md border border-[#d9bfb7] w-[110px] h-[110px]" src={imgData.src} alt="sample" />
                <span className="mt-2 text-center text-sm">{imgData.size} KB {imgData.type}</span>
            </div>
            <div className="flex flex-grow w-full md:w-3/4 p-2">
                <SlateEditor />
            </div>
        </div>
    )
};

export default Body;