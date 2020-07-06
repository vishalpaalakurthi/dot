import React from 'react'
import styled from 'styled-components'

import Icon from 'react-icons-kit'
import { grid, helpCircle, plus } from 'react-icons-kit/feather'
import { Link } from 'react-router-dom';

export default ({ workspaces ,user}) => { 
    return (
    <Wrapper>
        <Link to="/" className="options" >
            <Icon icon={grid} />
        </Link>

        <Items>
            {workspaces && workspaces.map((workspace, index) => (
                <Item
                    key={`item-${index}`}
                    index={index}
                    to={"/w/" + workspace.id}
                    style={{textTransform:'uppercase'}}
                >{workspace.title.slice(0, 2)}</Item>
            ))}
            <Item to="/create"><Icon icon={plus} /></Item>
        </Items> 
        <Item to="/"><img src={user.photoURL} height="32px" width="32px" style={{borderRadius:'25px'}} alt="U"/></Item>
        <Item to="/settings">
            <Icon icon={helpCircle} />
        </Item> 
    </Wrapper>
)}

const Wrapper = styled.div`
    display:flex;
    height:100%;
    flex-direction:column;
    text-align:center;
    .options{
        padding:10px;
    } 
    .avatar{
        height:20px;
        width:20px;
        border-radius:10px;
        background:#555;
        display:block;
    }
`

const Items = styled.div` 
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
`
const Item = styled(Link)`
    padding:10px; 
`