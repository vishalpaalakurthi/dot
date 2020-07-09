import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
  
import styled from 'styled-components'; 
import spaces from './spaces' 
// list of worspaces and global search on the Top
class Workspaces extends React.Component {
 
    componentDidMount(){  
       /*
            1) show list of spaces 
            2) select first space data into redux or from /:sid
            3) switch space data into redux
       */
    }
    render() {
        return (
            <Wrapper>
                 <Container> 
                    <Switch>
                        <Route component={spaces} path={["/:wid/:sid","/:wid/:sid/:cid"]} /> 
                    </Switch>
                </Container>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state, ownprops) => { 
    debugger;
    if (ownprops.match.params.wid && state.user.workspaces) {
        const ws = state.user.workspaces.filter(({ id }) => id === ownprops.match.params.wid)
        return {
            ...ownprops,
            user: state.user,
            workspace: ws[0],
            spaces:state.spaces
        };
    }
    else { 
        return { ...ownprops, user: state.user ,workspaces:state.workspaces}
    }
}

const Wrapper = styled.div`
    display:flex;
    flex:1;
    height:100%;
`

const Container = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    height:100%;
`

export default connect(mapStateToProps)(Workspaces)