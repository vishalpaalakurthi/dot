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
export const getWorkspaceByID = (dispatch, id) => {

}
export const getWorkspaces = (dispatch, id) => {
    fire.getWorkspaces(id).then(w => {
        dispatch({ type: 'UPDATE_WORKSPACES', workspaces: w })
    })
}

export const getSpaces = (dispatch) => {
    fire.getSpaces().then(s => {
        dispatch({ type: 'UPDATE_SPACES', spaces: s })
    })
}

export const getSnippets = (dispatch) => {
    fire.getSnippets().then(s => {
        dispatch({ type: 'UPDATE_SNIPPETS', snippets: s })
    })
}
export const getAllData = (dispatch) => {
    let userID = localStorage.getItem('authedUser');
    if (userID) {
        // getUser(dispatch, userID); 
        // getWorkspaces(dispatch) ;
        // getSpaces(dispatch)
        // getSnippets(dispatch)

        fire.getUserInfo(userID).then(u => {
            dispatch({ type: 'UPDATE_USER', user: u });
            fire.getWorkspaces(userID).then(w => {
                dispatch({ type: 'UPDATE_WORKSPACES', workspaces: w })
                fire.getSpaces().then(s => {
                    dispatch({ type: 'UPDATE_SPACES', spaces: s })
                    fire.getSnippets().then(s => {
                        dispatch({ type: 'UPDATE_SNIPPETS', snippets: s })
                    })
                })
            })
        }).catch(e => {
        })
    }
}