"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { motion } from "framer-motion";

const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            title
            description
            link
            details
        }
    }
`;

const ADD_PROJECT = gql`
    mutation AddProject(
        $title: String!
        $description: String!
        $link: String!
        $details: String!
    ) {
        addProject(title: $title, description: $description, link: $link, details: $details) {
            id
            title
            description
            link
            details
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation UpdateProject(
        $id: ID!
        $title: String!
        $description: String!
        $link: String!
        $details: String!
    ) {
        updateProject(
            id: $id
            title: $title
            description: $description
            link: $link
            details: $details
        ) {
            id
            title
            description
            link
            details
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id)
    }
`;

export default function AdminPage() {
    const { loading, error, data } = useQuery(GET_PROJECTS);
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
    });
    const [addProject] = useMutation(ADD_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
    });
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        link: "",
        details: "",
    });
    const [editingProject, setEditingProject] = useState(null);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os projetos: {error.message}</p>;

    const handleAddProject = (e) => {
        e.preventDefault();
        addProject({ variables: newProject });
        setNewProject({ title: "", description: "", link: "", details: "", });
    };

    const handleEdit = (project) => {
        setEditingProject(project);
    };

    const handleUpdateProject = (e) => {
        e.preventDefault();
        updateProject({
            variables: { id: editingProject.id, ...editingProject },
        });
        setEditingProject(null);
    };

    const handleDelete = (id) => {
        if (confirm("Tem certeza que deseja excluir este projeto?")) {
            deleteProject({ variables: { id } });
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-6">Painel de Admin</h1>
            <table className="min-w-full bg-white shadow-md rounded mb-4">
                <thead>
                    <tr>
                        <th className="text-left p-4 text-black">Título</th>
                        <th className="text-left p-4 text-black">Descrição</th>
                        <th className="p-4 text-black">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.projects.map((project) => (
                        <tr key={project.id} className="border-b">
                            <td className="p-4 text-gray-600">
                                {project.title}
                            </td>
                            <td className="p-4 text-gray-600">
                                {project.description}
                            </td>
                            <td className="p-4">
                                <motion.button
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => handleEdit(project)}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.5 },
                                    }}
                                >
                                    Editar
                                </motion.button>
                                <motion.button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleDelete(project.id)}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.5 },
                                    }}
                                >
                                    Excluir
                                </motion.button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!editingProject && (
                <>
                    <h2 className="text-2xl font-bold mb-4">
                        Adicionar Novo Projeto
                    </h2>
                    <form onSubmit={handleAddProject} className="mb-6">
                        <input
                            type="text"
                            placeholder="Título"
                            value={newProject.title}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    title: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Descrição"
                            value={newProject.description}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    description: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Detalhes"
                            value={newProject.details}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    details: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="url"
                            placeholder="Link do Projeto"
                            value={newProject.link}
                            onChange={(e) =>
                                setNewProject({
                                    ...newProject,
                                    link: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <motion.button
                            className="bg-green-500 text-white px-4 py-2 rounded font-bold"
                            type="submit"
                            whileHover={{
                                backgroundColor: "#fff",
                                color: "#48bb78",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Adicionar novo Projeto
                        </motion.button>
                    </form>
                </>
            )}

            {editingProject && (
                <>
                    <h2 className="text-2xl font-bold mb-4">Editar Projeto</h2>
                    <form onSubmit={handleUpdateProject} className="mb-6">
                        <input
                            type="text"
                            placeholder="Título"
                            value={editingProject.title}
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    title: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Descrição"
                            value={editingProject.description}
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    description: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Detalhes"
                            value={editingProject.details}
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    details: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <input
                            type="url"
                            placeholder="Link do Projeto"
                            value={editingProject.link}
                            onChange={(e) =>
                                setEditingProject({
                                    ...editingProject,
                                    link: e.target.value,
                                })
                            }
                            className="block w-full mb-4 p-2 border border-gray-300 rounded text-gray-600"
                            required
                        />
                        <motion.button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2 font-bold"
                            type="submit"
                            whileHover={{
                                backgroundColor: "#fff",
                                color: "#48bb78",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Atualizar Projeto
                        </motion.button>
                        <motion.button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded font-bold"
                            onClick={() => setEditingProject(null)}
                            whileHover={{
                                backgroundColor: "#fff",
                                color: "#f56565",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Cancelar
                        </motion.button>
                    </form>
                </>
            )}
        </div>
    );
}
