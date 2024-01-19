import axios from "axios";

const API_URL = "/api/classrooms/";

// Get all classrooms
const getClassrooms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single classroom
const getClassroom = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create classroom
const createClassroom = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};

// Update classroom
const updateClassroom = async (id, data) => {
  const response = await axios.put(API_URL + id, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete classroom
const deleteClassroom = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const classroomService = {
  getClassrooms,
  createClassroom,
  deleteClassroom,
  getClassroom,
  updateClassroom,
};

export default classroomService;
