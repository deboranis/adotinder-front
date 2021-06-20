export default function pets(state, action) {
  switch (action.type) {
  	case "PROVIDE_PETS":
      return { ...state, pets: action.payload };
    default:
      return state;
  }
};