"use client";

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      title
      description
      link
      details
    }
  }
`;

export default function ProjectDetails() {
  const { id } = useParams();  

  if (!id) {
    return <p>ID inválido ou não encontrado na URL</p>;
  }

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },  
    onError: (error) => {
      console.error("Erro no Apollo Client:", error);
    },
  });

  if (loading) return <p>Carregando...</p>;
  if (error) {
    console.log("Erro na consulta GraphQL:", error);
    return <p>Erro ao carregar o projeto: {error.message}</p>;
  }

  const project = data?.project;

  if (!project) {
    return <p>Projeto não encontrado</p>;
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg mb-4">{project.description}</p>
      <p className="text-gray-700 mb-6">{project.details}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        Ver no Github
      </a>
    </main>
  );
}
