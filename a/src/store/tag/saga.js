import { takeEvery, put } from 'redux-saga/effects';
import * as constants from './constants';
import Toast from '../../components/Toast';
import axios from '../../axios';

function* getTag() {
  try {
    const res = yield axios.api_get_tag();
    const { code = 0, data = {}, msg = '' } = res.data;
    if ( code === 0 ) {
      Toast.error(msg);
    } else {
      Toast.success(msg);
      data.sort((a, b) => (
        b.num - a.num
      ));
      yield put({type: constants.INITTAG, data});
    }
  } catch (err) {
    console.log("ajax请求标签数据失败!\n", err);
  }
}

function* tagSaga() {
  yield takeEvery(constants.GET_TAG, getTag);
}

export default tagSaga;