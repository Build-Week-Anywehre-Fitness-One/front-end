import{
    FETCHING_CLASSES_START,
    FETCHING_CLASSES_SUCCESS, 
    FETCHING_CLASSES_ERROR,
    POSTING_CLASSES_START,
    POSTING_CLASSES_SUCCESS,
    POSTING_CLASSES_ERROR
}  from '../actions'

const initialState ={
    currentClasses : [],
    isCallingClass: false, //Get request
    isPostingClass: false, //post request
    isDeletingClass: false,
    error: ""
}

export const reducer = (state = initialState, action) => {
    switch(action.type){
        case "DELETING_CLASSES_START":
            return{
                ...state,
                isDeletingClass : true
            }
        case "DELETING_CLASSES_SUCCESS":
            return{
                ...state,
                currentClasses: action.payload,
                isDeletingClass : false
            }
        case "DELETING_CLASSES_ERROR":
            return{
                ...state,
                error: "There was an ERROR"
            }
        case FETCHING_CLASSES_START:
            return{
                ...state,
                currentClasses : [],
                isCallingClass: true, 
                error: ""
            }
            case FETCHING_CLASSES_SUCCESS:
                return{
                    ...state,
                    currentClasses : action.payload,
                    isCallingClass: false, 
                    error: ""
                }
            case FETCHING_CLASSES_ERROR:
                return{
                    ...state,
                    isCallingClass: false, 
                    error: "There was an Error fecthing your Data :("
                }
            case POSTING_CLASSES_START:
                return{
                    ...state,
                    isPostingClass: true
                }

            case POSTING_CLASSES_SUCCESS:
                return{
                    ...state,
                    curentClasses: [...state.currentClasses, action.payload]
                }
            case POSTING_CLASSES_ERROR:
                return{
                    ...state,
                    isPostingClass: false, 
                    error: "There was an Error Posting your Data :("

                }
                default:
                    return state //REMEMBER TO ALWAYS RETURN STATE
            
    }
}