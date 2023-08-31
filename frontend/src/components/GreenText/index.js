import Header from "./Header";
import Body   from "./Body";
import { forwardRef } from "react";

const GreenText = forwardRef((props, ref) => {
    return (
        <div className="flex flex-col text-[#810000] border border-[#d9bfb7] bg-[#f0e0d6] rounded-md" ref={ref}>
            { props.children }
        </div>
    )
});

GreenText.Header = Header;
GreenText.Body   = Body;

export default GreenText;