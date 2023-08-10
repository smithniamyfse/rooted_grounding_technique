import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}

export default AboutPage;


// some functions and values like 
// useLayoutCtx, getContentSxProps, CSS_TRANSITION, CONTENT_ID, and useFullscreenCtx 
// are assumed to be part of other modules in your project, and I've kept them as they are.

// import React from 'react';
// // import clsx from 'clsx';
// import { styled, useThemeProps } from '@mui/material/styles';
// import { useLayoutCtx } from '@mui-treasury/layout/WindowContext';
// import { getContentSxProps } from '@mui-treasury/layout/Content/getContentSxProps';
// import { CSS_TRANSITION, CONTENT_ID } from '@mui-treasury/layout';
// import { useFullscreenCtx } from '../Fullscreen/FullscreenContext';

// const ContentRoot = styled('main', {
//   name: 'AppContent',
//   slot: 'Root',
//   overridesResolver: (props, styles) => styles.root,
// })(({ ownerState }) => ({
//   transition: CSS_TRANSITION,
//   ...(ownerState.isFullscreen && {
//     flexGrow: 1,
//     minHeight: '0px',
//     display: 'flex',
//   }),
// }));

// const Content = (props) => {
//   const { children, ...inProps } = props;
//   const themeProps = useThemeProps({ props: inProps, name: 'AppContent' });
//   const ctx = useLayoutCtx();
//   const { builder } = ctx;
//   const sxProps = getContentSxProps(builder, CONTENT_ID);
//   const isFullscreen = useFullscreenCtx();

//   return (
//     <ContentRoot
//       {...themeProps}
//       className={clsx('Content', themeProps.className)}
//       sx={{
//         ...(isFullscreen && {
//           flexGrow: 1,
//           minHeight: 0,
//           display: 'flex',
//         }),
//         ...themeProps.sx,
//         ...sxProps,
//       }}
//       ownerState={{ isFullscreen }}
//     >
//       {typeof children === 'function' ? children(ctx) : children}
//     </ContentRoot>
//   );
// };

// export { Content };

