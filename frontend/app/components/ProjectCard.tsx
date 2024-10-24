"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold mb-4 text-black">{project.title}</h2>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <Link href={`/projects/${project.id}`} className="text-blue-500">
                Ver Detalhes
            </Link>
        </motion.div>
    );
}
