import React from 'react'

const End = () => {
    return React.createElement(
        'input',
        {type: 'time', id: 'end', min: '00:00', max: '23:59'},
        null
    )
}

export default End