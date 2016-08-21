import { TEACHER_LIST_ACTIONS } from '../actions/teacherList.actions';

export interface ITeacherListState {
  list: any[];
}

const INIT_STATE = {
  list: [],
  selectedTeacher: JSON.parse(
    `{"id":5,"authid":"auth0|57b2801371c16ce874b94fdd",
    "username":"Headmaster","name":"Dumbledore",
    "imageurl":"http://i.imgur.com/uJzJ4ix.jpg",
    "email":"ddore@gmail.com","teacherid":5,"teacher":true,"isavailable":true,
    "favorite":false,"rating":5,"ratingcount":0,"rate":null,"summary":null,
    "subjects":["Taco Making", "Dueling"]}`
  )
};

export function teacherListReducer(
  state = INIT_STATE,
  action
): ITeacherListState {
  switch (action.type) {
    case TEACHER_LIST_ACTIONS.SET_LIST:
      return Object.assign({}, state, {
        list: action.list
      });
    case TEACHER_LIST_ACTIONS.SET_TEACHER:
      return Object.assign({}, state, {
        selectedTeacher: action.teacher
      });
    default:
      return state;
  }
}
