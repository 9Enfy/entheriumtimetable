import React from 'react'

const Day = () => {
    return React.createElement(
        'select',
        {name: 'day', id: 'day'},
        React.createElement(
            'option',
            {value: 0},
            'LUN'
        ),
        React.createElement(
            'option',
            {value: 1},
            'MAR'
        ),
        React.createElement(
            'option',
            {value: 2},
            'MER'
        ),
        React.createElement(
            'option',
            {value: 3},
            'GIO'
        ),
        React.createElement(
            'option',
            {value: 4},
            'VEN'
        ),
        React.createElement(
            'option',
            {value: 5},
            'SAB'
        ),
        React.createElement(
            'option',
            {value: 6},
            'DOM'
        )
    )
}

export default Day