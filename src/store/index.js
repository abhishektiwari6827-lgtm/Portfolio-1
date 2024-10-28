<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
=======
import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
<<<<<<< HEAD
});
=======
})
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
