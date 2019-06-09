/* User */

const initUserState = {
    listingUsers: false,
    //listingMoreUsers: undefined, // id of post from which to start
    users: [],
    //hasMore: true,
    creatingUser: false,
    creatingGoal: false
    //creatingVote: false
};
export function user(state = initUserState, action) {
    switch (action.type) {
        case '@USER/START_LIST_USERS':
            return {
                ...state,
                listingUsers: true
                //listingMorePosts: undefined
            };
        case '@USER/END_LIST_USERS':
            if (!action.users)
                return {
                    ...state,
                    listingUsers: false
                };
            return {
                ...state,
                listingUsers: false,
                users: action.users
                //hasMore: action.posts.length > 0
            };
        /*case '@POST/START_LIST_MORE_POSTS':
            return {
                ...state,
                listingMorePosts: action.start
            };
        case '@POST/END_LIST_MORE_POSTS':
            if (!action.posts)
                return state;
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                hasMore: action.posts.length > 0
            };*/
        case '@USER/START_CREATE_USER':
            return {
                ...state,
                creatingUser: true
            };
        case '@USER/END_CREATE_USER':
            if (!action.user)
                return {
                    ...state,
                    creatingUser: false
                };
            var newUsers = state.users.slice();
            newUsers.unshift(action.user);
            return {
                ...state,
                creatingUser: false,
                users: newUsers
            };
        case '@USER/START_CREATE_GOAL_INCREASE':
            return {
                ...state,
                creatingGoal: true
            };
        case '@USER/END_CREATE_GOAL_INCREASE':
            if (!action.user)
                return {
                    ...state,
                    creatingGoal: false
                };
            var newUsers = state.users.map(u => {
                if (u.name === action.user.name)//////////////////??name???????????
                    return action.user;
                return u;
            });
            return {
                ...state,
                creatingGoal: false,
                users: newUsers
            };
        /*case '@POST/START_CREATE_VOTE':
            return {
                ...state,
                creatingVote: true
            };
        case '@POST/END_CREATE_VOTE':
            if (!action.post)
                return {
                    ...state,
                    creatingVote: false
                };
            var newPosts = state.posts.map(p => {
                if (p.id === action.post.id)
                    return action.post;
                return p;
            });
            return {
                ...state,
                creatingVote: false,
                posts: newPosts
            };*/
        default:
            return state;
    }
}

/* User Form */

const initUserFormState = {
    inputDanger: false,
    age : -1,
    weight: -1,
    gender: '',
    sugar_should_intake: -1,
    name: ''
};

export function userForm(state = initUserFormState, action) {
    switch (action.type) {
        case '@USER_FORM/INPUT_AGE':
            return {
                ...state,
                age: action.age
            };
        case '@USER_FORM/INPUT_WEIGHT':
            return {
                ...state,
                weight: action.weight
            };
        case '@USER_FORM/INPUT_NAME':
            return {
                ...state,
                name: action.name
            };
        case '@USER_FORM/SUGAR_GOAL':
            return {
                ...state,
                sugar_should_intake: parseInt(action.weight) + parseInt(action.age)
            };
        case '@USER_FORM/INPUT_GENDER':
            return {
                ...state,
                gender: action.gender
            };
        case '@USER_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        /*case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };*/
        default:
            return state;
    }
}