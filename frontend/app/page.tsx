"use client";

import ProjectsPage from "./projects/page";

export default function main() {
    return (
        <main className="p-10">
            <div className="grid grid-cols-1 gap-8">
                <ProjectsPage></ProjectsPage>
            </div>
        </main>
    );
}
