<<<<<<< HEAD
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
    },
    'Amazon': {
      description: 'A replica of the Amazon e-commerce platform, showcasing front-end development skills and user interface design.',
      technologies: ['HTML', 'CSS', 'JavaScript']
    }
  };

  const orderedProjects = ['Myntra', 'Elante_Mall', 'Skill_Up', 'WorkBoard', 'Amazon'];

  const sortedProjects = orderedProjects
    .map(name => data.find(project => project.name === name))
    .filter(Boolean);

  const otherProjects = data.filter(project => !orderedProjects.includes(project.name));

  return [...sortedProjects, ...otherProjects].map(project => ({
    ...project,
    description: projectDetails[project.name]?.description || project.description,
    technologies: projectDetails[project.name]?.technologies || [],
    deployStatus: 'idle',
    deployedUrl: null,
  }));
});

export const deployProject = createAsyncThunk(
  'projects/deployProject',
  async (projectId, { getState }) => {
    const { projects } = getState().projects;
    const project = projects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const response = await fetch(`https://api.github.com/repos/devilizbusy/${project.name}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        event_type: 'deploy'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to trigger deployment');
    }

    await new Promise(resolve => setTimeout(resolve, 30000));

    return { id: projectId, deployedUrl: `https://devilizbusy.github.io/${project.name}` };
  }
);
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await fetch('https://api.github.com/users/devilizbusy/repos')
  if (!response.ok) {
    throw new Error('Failed to fetch projects')
  }
  return response.json()
})
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91

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
<<<<<<< HEAD
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
=======
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default projectsSlice.reducer
>>>>>>> 8261e38b33ff92b8d5d1d71f7d64dafd1a5d0e91
