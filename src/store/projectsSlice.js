import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('https://api.github.com/users/devilizbusy/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
});

export const deployProject = createAsyncThunk('projects/deployProject', async (projectId, { getState }) => {
  const project = getState().projects.projects.find(p => p.id === projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  // Simulating a deployment process
  await new Promise(resolve => setTimeout(resolve, 2000));

  // In a real scenario, you would call your deployment service here
  // and get the deployed URL from the service's response
  const deployedUrl = `https://${project.name.toLowerCase().replace(/_/g, '-')}.yourdomain.com`;

  return { id: projectId, deployedUrl };
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload.map(project => ({
          ...project,
          deployStatus: 'idle',
          deployedUrl: null,
        }));
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deployProject.pending, (state, action) => {
        const project = state.projects.find(p => p.id === action.meta.arg);
        if (project) {
          project.deployStatus = 'deploying';
        }
      })
      .addCase(deployProject.fulfilled, (state, action) => {
        const project = state.projects.find(p => p.id === action.payload.id);
        if (project) {
          project.deployStatus = 'deployed';
          project.deployedUrl = action.payload.deployedUrl;
        }
      })
      .addCase(deployProject.rejected, (state, action) => {
        const project = state.projects.find(p => p.id === action.meta.arg);
        if (project) {
          project.deployStatus = 'failed';
          project.deployError = action.error.message;
        }
      });
  },
});

export const selectAllProjects = (state) => state.projects.projects;
export const selectProjectById = (state, projectId) => 
  state.projects.projects.find(project => project.id === projectId);

export default projectsSlice.reducer;