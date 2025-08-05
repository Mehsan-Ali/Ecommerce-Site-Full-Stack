interface TitleProps {
    text1: string;
    text2: string;
}

export const Title = (props: TitleProps) => {
    return (
        <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500"> 
                {props.text1}
                <span className="text-gray-700 font-medium"> {props.text2}</span>
            </p>
            <p className="w-12 sm:w-20 bg-gray-500 h-[1.5px]"></p>
        </div>
    )
}
