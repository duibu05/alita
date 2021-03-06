<% if (isTypeScript) { %>
import { Reducer } from 'redux';
import { query } from '@/services/api';
import { Effect } from '@/models/connect';

export interface <%= componentName %>ModelState {
  name: string;
}

export interface <%= componentName %>ModelType {
  namespace: '<%= name %>';
  state: <%= componentName %>ModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<<%= componentName %>ModelState>;
  };
}
<% } else { %>
  import { query } from '@/services/api';
<% } %>

const <%= componentName %>Model<% if (isTypeScript) { %>: <%= componentName %>ModelType<% } %> = {
  namespace: '<%= name %>',

  state: {
    name: '',
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(query, payload);
      console.log(data)
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default <%= componentName %>Model;
