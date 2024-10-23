import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('https://api.github.com/users/devilizbusy/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  const data = await response.json();

  const projectDetails = {
    'Myntra': {
      description: 'A clone of the Myntra e-commerce platform, showcasing front-end development skills and responsive design.',
      technologies: ['React.js', 'CSS', 'JavaScript']
    },
    'Elante_Mall': {
      description: 'A web application for a shopping mall, including store listings, events, and mall information.',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    'Skill_Up': {
      description: 'An online learning platform focused on skill development and course management.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB']
    },
    'Portfolio': {
      description: 'My personal portfolio website showcasing projects, skills, and professional information.',
      technologies: ['React.js', 'Redux', 'Tailwind CSS']
    },
    'WorkBoard': {
      description: 'A project management tool for organizing tasks and tracking progress.',
      technologies: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB']
    }
  };

  const orderedProjects = ['Myntra', 'Elante_Mall', 'Skill_Up', 'Portfolio', 'WorkBoard'];

  return orderedProjects
    .map(name => data.find(project => project.name === name))
    .filter(Boolean)
    .map(project => ({
      ...project,
      description: projectDetails[project.name]?.description || project.description,
      technologies: projectDetails[project.name]?.technologies || [],
      deployStatus: 'idle',
      deployedUrl: null,
    }));
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
        state.projects = action.payload;
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