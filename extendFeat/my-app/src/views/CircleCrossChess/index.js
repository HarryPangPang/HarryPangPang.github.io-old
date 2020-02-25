import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class CircleCrossChess extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="circle-warp">
                CircleCrossChess
            </div>
        )
    }
}
