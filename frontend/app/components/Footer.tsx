"use client"

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Rhulyanderson. Todos os Direitos Reservados!</p>
                <div className="mt-4">
                    <a href="linkedin" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-2">LinkedIn</a>
                    <a href="github" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-2">Github</a>
                </div>
            </div>
        </footer>
    )
}