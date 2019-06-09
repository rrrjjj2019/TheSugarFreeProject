import moment from 'moment'

/* Posts */

const initPostState = {
    listingPosts: false,
    listingMorePosts: undefined, // id of post from which to start
    posts: [],
    hasMore: true,
    creatingPost: false,
    todaySum: 0,
    today: '',
    streakDay: 0
    //creatingVote: false
};
export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LIST_POSTS':
            return {
                ...state,
                listingPosts: true,
                listingMorePosts: undefined
            };
        case '@POST/END_LIST_POSTS':
            if (!action.posts)
                return {
                    ...state,
                    listingPosts: false
                };
            return {
                ...state,
                listingPosts: false,
                posts: action.posts,
                hasMore: action.posts.length > 0
            };
        case '@POST/START_LIST_MORE_POSTS':
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
            };
        case '@POST/START_CREATE_POST':
            return {
                ...state,
                creatingPost: true,
                today: moment().format('L'),
                todaySum: 0
            };
        case '@POST/END_CREATE_POST':
            if (!action.post)
                return {
                    ...state,
                    creatingPost: false
                };
            var newPosts = state.posts.slice();
            newPosts.unshift(action.post);
            return {
                ...state,
                creatingPost: false,
                posts: newPosts
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
        case '@POST/END_CREATE_POST_UPDATE_TODAYSUM':
            var i, tempSum = 0;
            for(i = 0; i < state.posts.length; i++){
                if(moment((state.posts[i].ts)*1000).format('L') == state.today)
                    tempSum += parseInt(state.posts[i].sugar);
            }
            return{
                ...state,
                todaySum: tempSum
            }
        case 'POST/HAS_LOGIN_TODAY':
            var tempTodaySum = state.todaySum;
            var tempStreakDay = 0;
            if((state.today != action.today) && todaySum == 0){
                tempStreakDay = state.streakDay++;
                tempTodaySum = 0;
            }
            return{
                ...state,
                todaySum: tempTodaySum,
                today: action.today,
                streakDay: tempStreakDay
            }
        default:
            return state;
    }
}

/* Post Form */

const initPostFormState = {
    /*inputValue: '',
    inputDanger: false,
    mood: 'na'*/
    inputDrink: '',
    inputSugar: '',
    inputDangerDrink: false,
    inputDangerSugar: false
};

export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        /*case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        */
       case '@POST_FORM/INPUT_DRINK':
            return {
                ...state,
                inputDrink: action.value
            };
        case '@POST_FORM/INPUT_SUGAR':
            return {
                ...state,
                inputSugar: action.value
            };
        case '@POST_FORM/INPUT_DANGER_DRINK':
            return {
                ...state,
                inputDangerDrink: action.danger
            };
        case '@POST_FORM/INPUT_DANGER_SUGAR':
            return {
                ...state,
                inputDangerSugar: action.danger
            };
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {}
};

export function postItem(state = initPostItemState, action) {
    switch (action.type) {
        case '@POST_ITEM/TOGGLE_TOOLTIP':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: state.tooltipOpen[action.id] ? false : true
                }
            };
        case '@POST_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                tooltipOpen: {
                    // ...state.tooltipOpen,
                    [action.id]: action.toggle
                }
            };
        default:
            return state;
    }
}
