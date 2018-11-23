import * as constants from './constants';

const defaultState = {
  arts: {
    isRequest: false,
    pagination: {
      current_page: 1,
      page_size: 6,
      total: 0
    },
    data: []
  },
  tags: {
    isRequest: false,
    data: []
  },
  works: {
    isRequest: false,
    data: []
  },
  artsContent: [],
  article: {},
  set: {
    isRequest: false,
    data: {}
  },
  arch: {
    isRequest: false,
    data: []
  }
};

export default (state = defaultState, action) => {
  const oldState = JSON.parse(JSON.stringify(state));
  if (action.type === constants.INIT_ARTS) {
    oldState.arts = {
      isRequest: true,
      pagination: action.data.pagination,
      data: action.data.list
    };
  }

  if (action.type === constants.INIT_SET) {
    oldState.set = {
      isRequest: true,
      data: action.data.myInfo || ''
    };
  }

  if (action.type === constants.INIT_TAGS) {
    oldState.tags = {
      isRequest: true,
      data: action.data
    };
  }

  if (action.type === constants.INIT_WORKS) {
    oldState.works = {
      isRequest: true,
      data: action.data
    };
  }

  if (action.type === constants.INIT_ARCH) {
    oldState.arch = {
      isRequest: true,
      data: action.data
    };
  }

  if (action.type === constants.SET_ARTICLE) {
    oldState.article = action.data;
    const article = oldState.artsContent.find(item => item._id === action.data._id);
    if (!article) {
      oldState.artsContent = [...oldState.artsContent, action.data];
    }
  }

  return oldState;
};
