"use client";

import { gql, useQuery } from "@apollo/client";
import ProjectCard from "@/app/components/ProjectCard";

const GET_PROJECTS = gql`
    query GetProjects {
        projects {
            id
            title
            description
            link
        }
    }
`;

export default function ProjectsPage() {
    const { loading, error, data } = useQuery(GET_PROJECTS, {
        fetchPolicy: "network-only",
    });

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar os projetos: {error.message}</p>;

    return (
        <div className="p-10">
            <h1 className="text-5xl font-bold text-center mb-8">
                Meus Projetos
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
