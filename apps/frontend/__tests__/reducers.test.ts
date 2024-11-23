import userReducer, {
    fetchUserStart,
    fetchUserSuccess,
    fetchUserError,
    updateUserStart,
    updateUserSuccess,
    updateUserError,
  } from '../src/store/reducers';
  
  describe('User Reducer', () => {
    const initialState = {
      data: null,
      loading: false,
      error: null,
    };
  
    it('handles fetchUserStart', () => {
      const action = fetchUserStart();
      const expectedState = {
        ...initialState,
        loading: true,
        error: null,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  
    it('handles fetchUserSuccess', () => {
      const payload = { id: 1, name: 'John Doe' };
      const action = fetchUserSuccess(payload);
      const expectedState = {
        ...initialState,
        data: payload,
        loading: false,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  
    it('handles fetchUserError', () => {
      const error = 'Failed to fetch user';
      const action = fetchUserError(error);
      const expectedState = {
        ...initialState,
        loading: false,
        error,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  
    it('handles updateUserStart', () => {
      const action = updateUserStart();
      const expectedState = {
        ...initialState,
        loading: true,
        error: null,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  
    it('handles updateUserSuccess', () => {
      const payload = { id: 1, name: 'Jane Doe' };
      const action = updateUserSuccess(payload);
      const expectedState = {
        ...initialState,
        data: payload,
        loading: false,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  
    it('handles updateUserError', () => {
      const error = 'Failed to update user';
      const action = updateUserError(error);
      const expectedState = {
        ...initialState,
        loading: false,
        error,
      };
      const result = userReducer(initialState, action);
      expect(result).toEqual(expectedState);
    });
  });
  