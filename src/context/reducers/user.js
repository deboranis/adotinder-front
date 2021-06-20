export default function user(state, action) {
  switch (action.type) {
  	case "PROVIDE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// reducer é uma avaliação específica de ação no estado. ou ele edita o estado pra incluir o caso dele, ou retorna o estado