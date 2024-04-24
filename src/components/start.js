import React from 'react'

const Start = () => {
    return React.createElement(
        'input',
        {type: 'time', name: 'start', id: 'start', min: '00:00', max: '23:59'},
        null
    )
}

export default Start