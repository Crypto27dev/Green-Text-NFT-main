export const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

export const GreenTextElement = props => {
    return <div className="text-[#789922] before:content-['>_']" {...props.attributes}>{props.children}</div>
}

export const renderElement = (props) => {
    switch (props.element.type) {
      case 'green-text':
        return <GreenTextElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
};