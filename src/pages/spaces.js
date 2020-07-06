import React from 'react'
import { Switch, Route } from 'react-router-dom'
import snippets from './snippets'
class spaces extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                spaces
                <Switch>
                    <Route component={snippets} path={"/:wid/:sid/:cid"} />
                </Switch>
            </div>
        )
    }
}
export default spaces