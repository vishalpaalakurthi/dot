import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
 
import Sidebar from '../components/sidebar'
import styled from 'styled-components';
import Icon from 'react-icons-kit'
import { chevronLeft, chevronRight } from 'react-icons-kit/feather';
import { bell } from 'react-icons-kit/feather'; 
import spaces from './spaces'
import Create from '../components/workspace/Create';

// list of worspaces and global search on the Top
class Workspaces extends React.Component {
    constructor() {
        super();
        this.state = {
            showCreateModal:false,

        } 
    }
    componentDidMount(){  
    }
    render() {
        return (
            <Wrapper>
                <Sidebar user={this.props.user} workspaces={this.props.workspaces} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart} />
                <Container>
                    <div style={{ display: 'flex', padding: '0px 10px' }}>
                        <Icon icon={chevronLeft} style={{ padding: 10 }} onClick={this.props.history.goBack} />
                        <Icon icon={chevronRight} style={{ padding: 10 }} onClick={this.props.history.goForward} />
                        <div style={{ flex: 1 }} />
                        <Icon icon={bell} style={{ padding: 10 }} onClick={()=>{this.setState({showCreateModal:!this.state.showCreateModal})}} />
                    </div>
                    <Switch>
                        <Route component={spaces} path={["/:wid/:sid","/:wid/:sid/:cid"]} /> 
                    </Switch>
                </Container>
                {this.state.showCreateModal && <Create onClick={()=>{this.setState({showCreateModal:!this.state.showCreateModal})}}/>}
            </Wrapper>
        )
    }
}

const mapStateToProps = (state, ownprops) => { 
    if (ownprops.match.params.wid && state.workspaces) {
        const ws = state.workspaces.filter(({ id }) => id === ownprops.match.params.wid)
        return {
            ...ownprops,
            user: state.user,
            workspace: ws[0],
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