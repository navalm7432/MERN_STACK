const initialState = {
  // setting initial state
  data: [],
  loading: false,
  isEmpty: false,
};
const rootReducer = (state = initialState, action) => {
  //  this function is called reducr and is passed to store where we have set up the redux store it takes two args:
  // 1st initial state 2nd action which is an object that is passed using dispatch() in which we set diffeent types and that is used
  //  perform different using switch case
  switch (action.type) {
    case "GET_ITEMS": // in this case we returning the current state as it but updating the data array from the action we received
      return {
        ...state,
        data: action.payload, //the object which we get in as action contains payload variable payload which contains our array fetched from db
        loading: false,
      };
    case "ADD_ITEM":
      // here we are keeping the current state and upadting data array in that also keeping all its current content
      //and adding the new object we recieved from action object
      return { ...state, data: [action.payload, ...state.data] };
    case "REMOVE_ITEM":
      return {
        //here we are keeping the current case and just filtering data array using the id of the itme removed using delete req
        // we recieved from action object
        ...state,
        data: state.data.filter((Id) => Id._id !== action.payload),
      };
    case "LOADING_ITEMS":
      return {
        ...state,
        loading: true,
      };
    case "IS_EMPTY":
      return {
        ...state,
        isEmpty: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
