"use client";

import { motion } from "framer-motion";

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-6 mb-10 flex flex-row justify-between">
            <div className="container mx-auto px-4">
                <a href="/" className="text-4xl font-bold">
                    Meu Portifólio
                </a>
                <p className="text-lg mt-2">
                    Desenvolvedor Full Stack | Next.js, Node.js, GraphQL
                </p>
            </div>
            <div className="container mx-auto px-4 text-right">
                <motion.a
                    href="../pages/login"
                    className="rounded-lg border p-3 font-bold"
                    whileHover={{ backgroundColor: "#fff", color: "#3182ce" }}
                    transition={{ duration: 0.3 }}
                >
                    Painel Admin
                </motion.a>
            </div>
        </header>
    );
}
