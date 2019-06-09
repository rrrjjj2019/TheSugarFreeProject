import {
    createUsers as createUserFromApi,
    listUsers as listUsersFromApi,
    createGoalIncrease as createGoalIncreaseFromApi
} from '../api/posts.js';

/*  Users */

function startListUsers() {
    return {
        type: '@USER/START_LIST_USERS'
    };
}

function endListUsers(users) {
    return {
        type: '@USER/END_LIST_USERS',
        users
    };
}

/*function startListMoreUsers(start) {
    return {
        type: '@USER/START_LIST_MORE_USERS',
        start
    };
}

function endListMoreUsers(users) {
    return {
        type: '@USER/END_LIST_MORE_USERS',
        users
    };
}*/

function startCreateUser() {
    return {
        type: '@USER/START_CREATE_USER'
    };
}

function endCreateUser(user) {
    return {
        type: '@USER/END_CREATE_USER',
        user
    };
}

export function listUsers(/*searchText*/) {
    return (dispatch, getState) => {
        dispatch(startListUsers());
        return listUsersFromApi(/*searchText*/).then(users => {
            console.log("end_list_users users = ")
            console.log(users);
            dispatch(endListUsers(users));
        }).catch(err => {
            dispatch(endListUsers());
            console.error('Error listing users', err);
        });
    };
};

/*export function listMorePosts(searchText, start) {
    return (dispatch, getState) => {
        dispatch(startListMorePosts(start));
        return listPostsFromApi(searchText, start).then(posts => {
            dispatch(endListMorePosts(posts));
        }).catch(err => {
            dispatch(endListMorePosts());
            console.error('Error listing more posts', err);
        });
    };
};*/

export function createUser(age, weight, gender, sugar_should_intake, userId) {
    return (dispatch, getState) => {
        dispatch(startCreateUser());

        return createUserFromApi(age, weight, gender, sugar_should_intake, userId).then(user => {
            console.log("user = ")
            console.log(user);
            dispatch(endCreateUser(user));
        }).catch(err => {
            dispatch(endCreateUser())
            console.error('Error creating user', err);
        });
    };
};

/*export function createVote(id, mood) {
    return (dispatch, getState) => {
        dispatch(startCreateVote());

        return createVoteFromApi(id, mood).then(post => {
            dispatch(endCreateVote(post));
        }).catch(err => {
            dispatch(endCreateVote())
            console.error('Error creating vote', err);
        });
    };
};*/

function startCreateGoal_Increase() {
    return {
        type: '@USER/START_CREATE_GOAL_INCREASE'
    };
}

function endCreateGoal_Increase(user) {
    return {
        type: '@USER/END_CREATE_GOAL_INCREASE',
        user
    };
}

export function createGoalIncrease(userId, goal) {
    return (dispatch, getState) => {
        dispatch(startCreateGoal_Increase());

        return createGoalIncreaseFromApi(userId, goal).then(user => {
            dispatch(endCreateGoal_Increase(user));
        }).catch(err => {
            dispatch(endCreateGoal_Increase())
            console.error('Error creating goal', err);
        });
    };
};

/*  User Form */

export function inputAge(age) {
    return {
        type: '@USER_FORM/INPUT_AGE',
        age
    };
};

export function inputWeight(weight) {
    return {
        type: '@USER_FORM/INPUT_WEIGHT',
        weight
    };
};

export function inputName(name) {
    return {
        type: '@USER_FORM/INPUT_NAME',
        name
    };
};

export function sugarGoal(age, weight) {
    return {
        type: '@USER_FORM/SUGAR_GOAL',
        age,
        weight
    };
};

export function inputGender(gender) {
    return {
        type: '@USER_FORM/INPUT_GENDER',
        gender
    };
};

export function inputDanger(danger) {
    return {
        type: '@USER_FORM/INPUT_DANGER',
        danger
    };
};

/*export function selectMood(mood) {
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood
    };
};*/

/*  Post item */

export function toggleTooltip(id) {
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

export function setTooltipToggle(id, toggle) {
    return {
        type: '@POST_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        toggle
    };
};
