import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createWorkspace } from '../api';

class CreateWokrspace extends React.Component {
    constructor() {
        super();

        this.state = {
            id: null,
            title: "",
            privacy: "public",
            members: []
        }
    }

    componentDidMount() {
        var eMembers = this.state.members;
        eMembers.push({
            uid: this.props.user.uid,
            email: this.props.user.email,
            photoURL: this.props.user.photoURL,
            role: 'OWNER'
        });
        this.setState({ members: eMembers });
    }

    inviteTeamMember = e => {
        if (e.key === "Enter") {
            console.log(e.target.value);
            // getUserByEmail(e.target.value);
            var member = {
                uid: 'uid' + "-" + e.target.value,
                email: e.target.value,
                photoURL: 'https://img.buymeacoffee.com/api/?name=Achuth+Hadnoor&size=300&bg-image=bmc',
                role: 'MEMBER'
            };
            var eMembers = this.state.members;
            eMembers.push(member);
            this.setState({ members: eMembers });
        }
    }

    addWorkSpace = async () => {
        console.log(this.state);
        await createWorkspace(this.props.dispatch, this.state, this.props.user);
        this.props.history.push(this.state.id);
    }

    render() {
        return (
            <Wrapper>
                <div>
                    create workspace
                </div>
                <div>
                    <span>Title</span>
                    <TextInput type="text" value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />

                    <button onClick={this.addWorkSpace}>Add Workspace</button>
                </div>
            </Wrapper>
        )
    }
}



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-evenly;
`;

const TextInput = styled.input`
    width: 150px;
    height: 30px;
    border: none;
    border-radius: 10px;
`;

const mapStateToProps = state => {
    return ({ user: state.user })
}

export default connect(mapStateToProps)(CreateWokrspace);