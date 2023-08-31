const Header = () => {
    const getRandomInt = () => Math.floor((Math.random() * (99999999 - 11111111 + 1)) + 11111111);

    return (
        <div className="flex justify-between px-2 py-[2.5px] bg-[#e2d1c6] border-b border-[#d9bfb7] text-sm">
            <span className="text-[#117743] font-bold">Anonymous</span>
            <div className="flex flex-col md:justify-between md:flex-row md:w-2/3">
                <span>{new Date().toLocaleString()}</span>
                <span>No.{getRandomInt()}</span>
            </div>
        </div>
    )
}

export default Header;