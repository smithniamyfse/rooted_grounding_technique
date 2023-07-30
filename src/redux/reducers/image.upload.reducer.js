const initialState = {
    isUploading: false,
    imageUrl: null,
    error: null,
  };
  
const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPLOAD_IMAGE_REQUEST':
        return { ...state, isUploading: true, error: null };
      case 'UPLOAD_IMAGE_SUCCESS':
        return { ...state, isUploading: false, imageUrl: action.payload };
      case 'UPLOAD_IMAGE_ERROR':
        return { ...state, isUploading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default imageReducer;
  