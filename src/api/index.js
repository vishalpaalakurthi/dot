import fire from './firebase'
export const getUser = (dispatch, userID) => { 
    fire.getUserInfo(userID).then(u => {
        dispatch({ type: 'UPDATE_USER', user: u }) 
    }).catch(e => {
    })
}
export const updateUser = (dispatch, user) => { 
    fire.updateUserInfo(user).then((u) => { 
        dispatch({ type: 'UPDATE_USER', user: u })
    })
}  
export const getWorkspaceByID = (dispatch,id)   =>{

}
export const getWorkspaces = (dispatch,id)=>{
    fire.getWorkspaces(id).then(w=>{
        dispatch({type:'UPDATE_WORKSPACES',workspaces:w})
    })
}
export const getAllData = (dispatch) => {
    let userID = localStorage.getItem('authedUser');
    if (userID) {
        getUser(dispatch, userID); 
        getWorkspaces(dispatch) 
    }
}

export const createWorkspace = async (dispatch, wsDef, user) => {
    return await fire.createWorkspace(wsDef, user)
    .then((ws) => {
        fire.updateUserInfo(user);
        dispatch({ type: 'UPDATE_USER', user: user })
        dispatch({ type: 'UPDATE_WORKSPACES', workspaces: user.workspaces })
    })
}