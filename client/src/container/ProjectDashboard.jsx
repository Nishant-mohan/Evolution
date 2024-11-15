import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/Dashboard/Topbar";
import ProjectCard from "../components/Dashboard/ProjectCard";
import Modal from "../components/Dashboard/Modal";
import CreateProjectForm from "../components/Dashboard/CreateProjectForm";
import { useSelector } from "react-redux";
import ApiDashboard from "../scripts/API.Dashboard";
import User from "../scripts/API.User";
import url from "../url.json";

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo._id);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [isSharedView, setIsSharedView] = useState(false);
  const [sharedFilteredProjects, setSharedFilteredProjects] = useState([]);
  
  const API = new ApiDashboard();
  const APIUser = new User(user);

  const updateProject = (projectId, projectData) => {
    const updatedProjects = projects.map((project) => {
      return project?._id === projectId
        ? { ...project, name: projectData.name, description: projectData.description }
        : project
    });
    setProjects(updatedProjects);
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  useEffect(() => {
    const filterProjects = () => {
      const results = searchQuery
        ? projects.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : projects;
      setFilteredProjects(results);

      const sharedResults = searchQuery
        ? sharedProjects.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : sharedProjects;
      setSharedFilteredProjects(sharedResults);
    };

    filterProjects();
  }, [searchQuery, projects, sharedProjects]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const personalProjects = await APIUser.getAllUsersProject();
      const fetchedSharedProjects = await APIUser.getAllSharedProjects();
      setProjects(personalProjects);
      setFilteredProjects(personalProjects);
      setSharedProjects(fetchedSharedProjects);
      setSharedFilteredProjects(fetchedSharedProjects);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (newProject) => {
    try {
      const createdProject = await API.createProject(newProject);
      setProjects((prev) => [...prev, createdProject]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.deleteProject(projectId);
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  const handleProjectClick = (projectID) => {
    navigate(url.Main.replace(":projectID", projectID));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsSharedView(false)}
            className={`px-4 py-2 rounded ${!isSharedView ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setIsSharedView(true)}
            className={`px-4 py-2 rounded ${isSharedView ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Shared Projects
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center justify-center h-64 gap-4 p-6 transition-colors bg-white border-2 border-red-300 border-dashed rounded-lg cursor-pointer hover:border-red-500"
          >
            Create New Project
          </button>
          {isLoading ? (
            <div className="col-span-3 py-12 text-center">
              Loading projects...
            </div>
          ) : (
            (isSharedView ? sharedFilteredProjects : filteredProjects).map((project) => project && (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={handleDeleteProject}
                onClick={handleProjectClick}
                onUpdate={updateProject}
              />
            ))
          )}
        </div>
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreateProjectForm onCreateProject={handleCreateProject} />
      </Modal>
    </div>
  );
};

export default ProjectDashboard;
