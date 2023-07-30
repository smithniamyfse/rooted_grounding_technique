const initialState = {
    isUploading: false,
    imageUrl: null,
    images: [],
    error: null,
};
  
const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_IMAGE_REQUEST':
            return { ...state, isUploading: true, error: null };
        case 'UPLOAD_IMAGE_SUCCESS':
            return { 
                ...state, 
                isUploading: false, 
                imageUrl: action.payload, 
                images: [...state.images, action.payload] 
            };
        case 'UPLOAD_IMAGE_ERROR':
            return { ...state, isUploading: false, error: action.payload };
            case 'FETCH_IMAGES_SUCCESS':
                return { ...state, images: action.payload };
        case 'FETCH_IMAGES_ERROR':
            return { ...state, error: action.payload };
        case 'FETCH_IMAGE_SUCCESS':
            return { ...state, images: [...state.images, action.payload] };
        case 'FETCH_IMAGE_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default imageReducer;







// const initialState = {
//   isUploading: false,
//   imageUrl: null,
//   images: [],
//   error: null,
// };

// const imageReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "UPLOAD_IMAGE_REQUEST":
//       return { ...state, isUploading: true, error: null };
//     case "UPLOAD_IMAGE_SUCCESS":
//       return {
//         ...state,
//         isUploading: false,
//         imageUrl: action.payload,
//         images: [...state.images, action.payload],
//       };
//     case "UPLOAD_IMAGE_ERROR":
//       return { ...state, isUploading: false, error: action.payload };
//     case "FETCH_IMAGES_SUCCESS":
//       return { ...state, images: action.payload };
//     case "FETCH_IMAGES_ERROR":
//       return { ...state, error: action.payload };
//     case "FETCH_IMAGE_SUCCESS":
//       return { ...state, images: [...state.images, action.payload] };
//     case "FETCH_IMAGE_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// };

// export default imageReducer;

// const initialState = {
//     isUploading: false,
//     imageUrl: null,
//     images: [],
//     error: null,
// };

// const imageReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'UPLOAD_IMAGE_REQUEST':
//             return { ...state, isUploading: true, error: null };
//         case 'UPLOAD_IMAGE_SUCCESS':
//             return {
//                 ...state,
//                 isUploading: false,
//                 imageUrl: action.payload,
//                 images: [...state.images, action.payload]
//             };
//         case 'UPLOAD_IMAGE_ERROR':
//             return { ...state, isUploading: false, error: action.payload };
//             case 'SET_IMAGE':
//                 return { ...state, imageUrl: action.payload };
//               default:
//                 return state;
//     }
// };

// export default imageReducer;

// const initialState = {
//     isUploading: false,
//     imageUrl: null,
//     error: null,
//   };

// const imageReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'UPLOAD_IMAGE_REQUEST':
//         return { ...state, isUploading: true, error: null };
//       case 'UPLOAD_IMAGE_SUCCESS':
//         return { ...state, isUploading: false, imageUrl: action.payload };
//       case 'UPLOAD_IMAGE_ERROR':
//         return { ...state, isUploading: false, error: action.payload };
//       default:
//         return state;
//     }
//   };

//   export default imageReducer;
